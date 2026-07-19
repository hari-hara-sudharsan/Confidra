import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService implements OnModuleInit {
  private readonly logger = new Logger(BlockchainService.name);
  
  private provider!: ethers.JsonRpcProvider;
  private wallet!: ethers.Wallet;
  
  // Confidra Contract Addresses
  private executionRegistryAddress: string;

  // ABIs
  private readonly executionRegistryAbi = [
    "function recordExecution(bytes32 _id, bytes32 _workflowId, bytes32 _executionHash, bytes calldata _teeSignature) external"
  ];

  constructor(private configService: ConfigService) {
    this.executionRegistryAddress = this.configService.get<string>('EXECUTION_REGISTRY_ADDRESS') || '0x0000000000000000000000000000000000000000';
  }

  onModuleInit() {
    const rpcUrl = this.configService.get<string>('FLARE_RPC_URL') || 'http://127.0.0.1:8545';
    const privateKey = this.configService.get<string>('FLARE_PRIVATE_KEY') || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; // Hardhat #0

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    
    this.logger.log(`Initialized BlockchainService connected to ${rpcUrl}`);
  }

  /**
   * Submit the verified TEE attestation to the Flare network.
   */
  async submitExecutionAttestation(
    executionId: string, 
    workflowId: string, 
    executionHash: string, 
    teeSignature: string
  ): Promise<string> {
    try {
      const contract = new ethers.Contract(
        this.executionRegistryAddress, 
        this.executionRegistryAbi, 
        this.wallet
      );

      // Formatting UUIDs to bytes32 is tricky, we'll hash the UUIDs for simplicity in this integration
      const bytes32ExecId = ethers.id(executionId);
      const bytes32WorkflowId = ethers.id(workflowId);
      
      const tx = await contract.recordExecution(
        bytes32ExecId,
        bytes32WorkflowId,
        "0x" + executionHash, 
        "0x" + teeSignature
      );

      this.logger.log(`Transaction submitted: ${tx.hash}`);
      
      const receipt = await tx.wait();
      this.logger.log(`Transaction confirmed in block ${receipt.blockNumber}`);

      return tx.hash;
    } catch (error) {
      this.logger.error(`Failed to submit execution attestation to Flare:`, error);
      throw error; // Let the ExecutionService handle the failure state
    }
  }
}

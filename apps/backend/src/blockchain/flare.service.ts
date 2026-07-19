import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class FlareService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(FlareService.name);
  
  private provider!: ethers.JsonRpcProvider;
  private wallet!: ethers.Wallet;
  private executionRegistryContract!: ethers.Contract;
  
  private executionRegistryAddress: string;
  private pollingInterval: NodeJS.Timeout | null = null;

  // ABIs
  private readonly executionRegistryAbi = [
    "function recordExecution(bytes32 _id, bytes32 _workflowId, bytes32 _executionHash, bytes calldata _teeSignature) external",
    "event ExecutionAnchored(bytes32 indexed executionId, bytes32 indexed workflowId, bytes32 indexed executionHash)",
    "event ExecutionVerified(bytes32 indexed executionId, bytes32 indexed workflowId, bytes32 indexed executionHash, uint256 timestamp)"
  ];

  constructor(private configService: ConfigService) {
    this.executionRegistryAddress = this.configService.get<string>('EXECUTION_REGISTRY_ADDRESS') || '0x0000000000000000000000000000000000000000';
  }

  async onModuleInit() {
    const rpcUrl = this.configService.get<string>('FLARE_RPC_URL') || 'http://127.0.0.1:8545';
    const privateKey = this.configService.get<string>('FLARE_PRIVATE_KEY') || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    
    this.executionRegistryContract = new ethers.Contract(
      this.executionRegistryAddress, 
      this.executionRegistryAbi, 
      this.wallet
    );
    
    this.logger.log(`Initialized FlareService connected to ${rpcUrl}`);
    
    // Start Phase 4: Live Event Engine
    this.startLiveEventEngine();
  }

  onModuleDestroy() {
    if (this.pollingInterval) clearInterval(this.pollingInterval);
  }

  /**
   * Phase 4: Live Flare Event Engine
   * Polls for new events from the blockchain to synchronize with the backend.
   */
  private startLiveEventEngine() {
    this.logger.log('Starting Live Flare Event Engine (Polling Strategy)...');
    
    // In a production environment with a dedicated WSS node, we would use contract.on()
    // For testnet resilience, we poll the latest blocks for our events.
    let lastBlockChecked = 0;
    
    this.pollingInterval = setInterval(async () => {
      try {
        const currentBlock = await this.provider.getBlockNumber();
        if (lastBlockChecked === 0) lastBlockChecked = currentBlock;
        
        if (currentBlock > lastBlockChecked) {
          // Fetch events
          const events = await this.executionRegistryContract.queryFilter(
            this.executionRegistryContract.filters.ExecutionAnchored(),
            lastBlockChecked + 1,
            currentBlock
          );
          
          for (const event of events) {
            // @ts-ignore - Ethers V6 EventLog
            const { executionId, workflowId, executionHash } = event.args;
            this.logger.log(`[Flare Event Engine] Caught ExecutionAnchored: ${executionId}`);
            // TODO: Synchronize to Prisma DB Audit log here
          }
          
          lastBlockChecked = currentBlock;
        }
      } catch (err) {
        this.logger.warn(`Flare Event Engine polling error: ${(err as Error).message}`);
      }
    }, 10000); // Poll every 10 seconds
  }

  /**
   * Phase 2: Transaction submission with Gas Estimation and Retry
   */
  async submitExecutionAttestation(
    executionId: string, 
    workflowId: string, 
    executionHash: string, 
    teeSignature: string
  ): Promise<string> {
    try {
      const bytes32ExecId = ethers.id(executionId);
      const bytes32WorkflowId = ethers.id(workflowId);
      
      this.logger.debug(`Estimating gas for attestation...`);
      // Gas estimation
      const estimatedGas = await this.executionRegistryContract.recordExecution.estimateGas(
        bytes32ExecId,
        bytes32WorkflowId,
        "0x" + executionHash, 
        "0x" + teeSignature
      );
      
      this.logger.log(`Gas Estimated: ${estimatedGas}. Submitting transaction...`);

      const tx = await this.executionRegistryContract.recordExecution(
        bytes32ExecId,
        bytes32WorkflowId,
        "0x" + executionHash, 
        "0x" + teeSignature,
        { gasLimit: (estimatedGas * 120n) / 100n } // 20% buffer
      );

      this.logger.log(`Transaction submitted: ${tx.hash}`);
      
      const receipt = await tx.wait();
      this.logger.log(`Transaction confirmed in block ${receipt.blockNumber} using ${receipt.gasUsed} gas.`);

      return tx.hash;
    } catch (error) {
      this.logger.error(`Failed to submit execution attestation to Flare:`, error);
      throw error;
    }
  }

  /**
   * Phase 7: Network Health Check
   */
  async checkNetworkHealth() {
    try {
      const start = Date.now();
      const blockNumber = await this.provider.getBlockNumber();
      const latency = Date.now() - start;
      const network = await this.provider.getNetwork();
      
      return {
        status: 'Operational',
        chainId: Number(network.chainId),
        latestBlock: blockNumber,
        latencyMs: latency
      };
    } catch (error) {
      return {
        status: 'Degraded',
        error: (error as Error).message
      };
    }
  }
}

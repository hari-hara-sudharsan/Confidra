import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CryptoService } from '../crypto/crypto.service';
import { SubmitJobDto } from './dto/submit-job.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ExecutionService {
  // Using localhost:8000 for the Python FastAPI TEE worker
  private readonly TEE_URL = 'http://localhost:8000/api/v1/tee/execute';

  constructor(
    private readonly prisma: PrismaService,
    private readonly crypto: CryptoService
  ) {}

  async submitJob(userId: string, dto: SubmitJobDto) {
    // 1. Validate Workflow access
    const workflow = await this.prisma.workflow.findFirst({
      where: { id: dto.workflowId, isDeleted: false },
    });

    if (!workflow) throw new NotFoundException('Workflow not found');

    // 2. Create Execution Log Record
    const execution = await this.prisma.executionLog.create({
      data: {
        workflowId: dto.workflowId,
        status: 'SUBMITTED',
        startedAt: new Date(),
        executionHash: '', // Will be updated
      },
    });

    // 3. Encrypt payload
    const payloadHash = this.crypto.generateHash(dto.payload);
    const { encryptedData, iv, authTag } = this.crypto.encrypt({
      jobId: execution.id,
      workflowId: dto.workflowId,
      payload: dto.payload,
      hash: payloadHash,
    });

    // 4. Send to TEE Worker (Fire and Forget or Await)
    // We'll await it for the synchronous execution simulation
    try {
      await this.prisma.executionLog.update({
        where: { id: execution.id },
        data: { status: 'TEE_PROCESSING' },
      });

      const response = await fetch(this.TEE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encryptedData, iv, authTag }),
      });

      if (!response.ok) {
        throw new Error('TEE Execution Failed');
      }

      const teeResult = await response.json();

      // 5. Verify TEE Signature & Attestation
      // In a real environment, we use the Flare Enclave public key. 
      // For now, we stub the public key.
      const isValid = this.crypto.verifyTeeSignature(
        teeResult.attestation.executionHash, 
        teeResult.attestation.signature,
        teeResult.attestation.publicKeyPem // (Provided or hardcoded)
      );

      if (!isValid) {
        throw new Error('Invalid TEE Attestation Signature');
      }

      // 6. Decrypt Results
      const decryptedResult = this.crypto.decrypt(
        teeResult.encryptedData,
        teeResult.iv,
        teeResult.authTag
      );

      // 7. Save Final State
      return this.prisma.executionLog.update({
        where: { id: execution.id },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          executionHash: teeResult.attestation.executionHash,
          resultPayload: decryptedResult,
        },
      });
      
    } catch (error: any) {
      console.error('TEE Execution Error:', error);
      
      await this.prisma.executionLog.update({
        where: { id: execution.id },
        data: {
          status: 'FAILED',
          completedAt: new Date(),
          errorMessage: error.message || 'Unknown TEE error',
        },
      });

      throw new InternalServerErrorException('Confidential Execution Failed');
    }
  }

  async getExecution(id: string, userId: string) {
    const execution = await this.prisma.executionLog.findUnique({
      where: { id },
    });
    if (!execution) throw new NotFoundException('Execution not found');
    return execution;
  }

  async getExecutionsForWorkflow(workflowId: string, userId: string) {
    return this.prisma.executionLog.findMany({
      where: { workflowId },
      orderBy: { startedAt: 'desc' },
    });
  }
}

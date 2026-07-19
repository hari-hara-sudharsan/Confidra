import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionService } from './execution.service';
import { PrismaService } from '../database/prisma.service';
import { CryptoService } from '../crypto/crypto.service';

describe('ExecutionService', () => {
  let service: ExecutionService;

  const mockPrismaService = {
    workflow: {
      findFirst: jest.fn(),
    },
    executionLog: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const mockCryptoService = {
    generateHash: jest.fn(() => 'mock-hash'),
    encrypt: jest.fn(() => ({ encryptedData: 'data', iv: 'iv', authTag: 'tag' })),
    decrypt: jest.fn(() => ({ status: 'APPROVED' })),
    verifyTeeSignature: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExecutionService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: CryptoService, useValue: mockCryptoService },
      ],
    }).compile();

    service = module.get<ExecutionService>(ExecutionService);
  });

  it('should get execution history for a workflow', async () => {
    const mockExecutions = [{ id: 'exec-1', status: 'COMPLETED' }];
    mockPrismaService.executionLog.findMany.mockResolvedValue(mockExecutions);

    const result = await service.getExecutionsForWorkflow('wf-1', 'user-1');
    expect(result).toEqual(mockExecutions);
    expect(mockPrismaService.executionLog.findMany).toHaveBeenCalledWith({
      where: { workflowId: 'wf-1' },
      orderBy: { startedAt: 'desc' },
    });
  });
});

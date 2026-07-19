import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowService } from './workflow.service';
import { PrismaService } from '../database/prisma.service';

describe('WorkflowService', () => {
  let service: WorkflowService;

  const mockPrismaService = {
    workspace: {
      findFirst: jest.fn(),
    },
    workflow: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkflowService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<WorkflowService>(WorkflowService);
  });

  it('should create a workflow when authorized', async () => {
    mockPrismaService.workspace.findFirst.mockResolvedValue({ id: 'w-1' });
    mockPrismaService.workflow.create.mockResolvedValue({ id: 'wf-1', status: 'DRAFT' });

    const result = await service.create('user-1', {
      workspaceId: 'w-1',
      name: 'Test Workflow',
    });

    expect(result.id).toBe('wf-1');
    expect(mockPrismaService.workflow.create).toHaveBeenCalled();
  });
});

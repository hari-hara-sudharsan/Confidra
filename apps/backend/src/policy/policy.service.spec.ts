import { Test, TestingModule } from '@nestjs/testing';
import { PolicyService } from './policy.service';
import { PrismaService } from '../database/prisma.service';

describe('PolicyService', () => {
  let service: PolicyService;

  const mockPrismaService = {
    policy: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PolicyService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PolicyService>(PolicyService);
  });

  it('should simulate policy evaluation correctly', async () => {
    mockPrismaService.policy.findUnique.mockResolvedValue({
      id: 'p-1',
      rules: [
        { id: 'r-1', action: 'APPROVE', condition: { score: 90 } },
      ],
    });

    const result = await service.simulatePolicy('p-1', { score: 90 });
    
    expect(result.outcome).toBe('APPROVED');
    expect(result.results.length).toBe(1);
    expect(result.results[0].action).toBe('APPROVE');
  });
});

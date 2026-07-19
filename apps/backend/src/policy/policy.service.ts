import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { CreateRuleDto } from './dto/create-rule.dto';

@Injectable()
export class PolicyService {
  constructor(private readonly prisma: PrismaService) {}

  async createPolicy(userId: string, dto: CreatePolicyDto) {
    const member = await this.prisma.member.findFirst({
      where: { organizationId: dto.organizationId, userId },
    });
    
    if (!member) throw new ForbiddenException('Access denied to this organization');

    return this.prisma.policy.create({
      data: dto,
    });
  }

  async createRule(userId: string, dto: CreateRuleDto) {
    const policy = await this.prisma.policy.findUnique({
      where: { id: dto.policyId },
      include: { organization: { include: { members: { where: { userId } } } } },
    });

    if (!policy || policy.organization.members.length === 0) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.rule.create({
      data: dto,
    });
  }

  async getPoliciesForWorkflow(workflowId: string, userId: string) {
    // RBAC validation done at controller or middleware typically, simplified here
    return this.prisma.policy.findMany({
      where: { workflowId },
      include: { rules: true },
    });
  }

  async simulatePolicy(policyId: string, payload: any) {
    const policy = await this.prisma.policy.findUnique({
      where: { id: policyId },
      include: { rules: true },
    });

    if (!policy) throw new NotFoundException('Policy not found');

    // Basic logic engine stub for Risk evaluation
    const results = policy.rules.map(rule => {
      // Stub evaluation of rule.condition against payload
      return { ruleId: rule.id, triggered: false, action: rule.action };
    });

    return { policyId, results, outcome: 'APPROVED' };
  }
}

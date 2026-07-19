import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { CreateRuleDto } from './dto/create-rule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Policies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new policy' })
  createPolicy(@CurrentUser() user: User, @Body() dto: CreatePolicyDto) {
    return this.policyService.createPolicy(user.id, dto);
  }

  @Post('rules')
  @ApiOperation({ summary: 'Add a rule to a policy' })
  createRule(@CurrentUser() user: User, @Body() dto: CreateRuleDto) {
    return this.policyService.createRule(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List policies for a workflow' })
  getPolicies(@Query('workflowId') workflowId: string, @CurrentUser() user: User) {
    return this.policyService.getPoliciesForWorkflow(workflowId, user.id);
  }

  @Post(':id/simulate')
  @ApiOperation({ summary: 'Simulate a payload against a policy' })
  simulate(@Param('id') id: string, @Body() payload: any) {
    return this.policyService.simulatePolicy(id, payload);
  }
}

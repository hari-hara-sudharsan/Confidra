import { Controller, Post, Get, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { SubmitJobDto } from './dto/submit-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Execution (TEE)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('executions')
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) {}

  @Post('submit')
  @ApiOperation({ summary: 'Submit a confidential workflow job to the Flare TEE' })
  submitJob(@CurrentUser() user: User, @Body() dto: SubmitJobDto) {
    return this.executionService.submitJob(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get execution history for a workflow' })
  getHistory(@Query('workflowId') workflowId: string, @CurrentUser() user: User) {
    return this.executionService.getExecutionsForWorkflow(workflowId, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get execution details and attestation' })
  getExecution(@Param('id') id: string, @CurrentUser() user: User) {
    return this.executionService.getExecution(id, user.id);
  }
}

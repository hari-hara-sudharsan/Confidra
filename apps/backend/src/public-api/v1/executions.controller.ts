import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiSecurity, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from '../../api-key/api-key.guard';
import { ExecutionService } from '../../execution/execution.service';

@ApiTags('Executions')
@ApiSecurity('api-key')
@UseGuards(ApiKeyAuthGuard)
@Controller('v1/executions')
export class ExecutionsV1Controller {
  constructor(private readonly executionService: ExecutionService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new confidential execution workflow' })
  @ApiResponse({ status: 201, description: 'Workflow submitted and queued for TEE processing.' })
  async createExecution(@Body() payload: any, @Req() req: any) {
    // req.apiAuth contains the organization context injected by the API Key guard
    const orgId = req.apiAuth.organizationId;
    return this.executionService.create(orgId, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve the status and result of a confidential execution' })
  @ApiResponse({ status: 200, description: 'Execution details returned.' })
  async getExecution(@Param('id') id: string, @Req() req: any) {
    const orgId = req.apiAuth.organizationId;
    return this.executionService.findOne(id, orgId);
  }
}

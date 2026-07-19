import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Workflows')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workflow' })
  create(@CurrentUser() user: User, @Body() dto: CreateWorkflowDto) {
    return this.workflowService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List workflows by workspace' })
  @ApiQuery({ name: 'workspaceId', required: true })
  findAll(@Query('workspaceId') workspaceId: string, @CurrentUser() user: User) {
    return this.workflowService.findAllByWorkspace(workspaceId, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workflow details' })
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.workflowService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update workflow configuration' })
  update(@Param('id') id: string, @Body() dto: UpdateWorkflowDto, @CurrentUser() user: User) {
    return this.workflowService.update(id, dto, user.id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate an existing workflow' })
  duplicate(@Param('id') id: string, @CurrentUser() user: User) {
    return this.workflowService.duplicate(id, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a workflow' })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.workflowService.remove(id, user.id);
  }
}

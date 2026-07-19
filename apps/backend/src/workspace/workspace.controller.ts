import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Workspaces')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organizations/:orgId/workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a workspace' })
  create(
    @Param('orgId') orgId: string,
    @CurrentUser() user: User,
    @Body() dto: CreateWorkspaceDto,
  ) {
    return this.workspaceService.create(orgId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all workspaces for an organization' })
  findAll(
    @Param('orgId') orgId: string,
    @CurrentUser() user: User,
  ) {
    return this.workspaceService.findAllByOrganization(orgId, user.id);
  }
}

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';

@Injectable()
export class WorkflowService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateWorkflowDto) {
    // Check if user has access to this workspace
    const workspace = await this.prisma.workspace.findFirst({
      where: {
        id: dto.workspaceId,
        organization: {
          members: { some: { userId } },
        },
      },
    });

    if (!workspace) {
      throw new ForbiddenException('You do not have access to this workspace');
    }

    return this.prisma.workflow.create({
      data: {
        workspaceId: dto.workspaceId,
        name: dto.name,
        templateId: dto.templateId,
        schemaConfig: dto.schemaConfig || {},
        status: 'DRAFT',
      },
    });
  }

  async findAllByWorkspace(workspaceId: string, userId: string) {
    const workspace = await this.prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        organization: {
          members: { some: { userId } },
        },
      },
    });

    if (!workspace) throw new ForbiddenException('Access denied');

    return this.prisma.workflow.findMany({
      where: { workspaceId, isDeleted: false },
      include: {
        stages: { orderBy: { order: 'asc' } },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const workflow = await this.prisma.workflow.findFirst({
      where: {
        id,
        isDeleted: false,
        workspace: {
          organization: { members: { some: { userId } } },
        },
      },
      include: {
        stages: { orderBy: { order: 'asc' } },
        policies: true,
      },
    });

    if (!workflow) throw new NotFoundException('Workflow not found');
    return workflow;
  }

  async update(id: string, dto: UpdateWorkflowDto, userId: string) {
    const workflow = await this.findOne(id, userId);

    return this.prisma.workflow.update({
      where: { id: workflow.id },
      data: dto,
    });
  }

  async duplicate(id: string, userId: string) {
    const workflow = await this.findOne(id, userId);

    return this.prisma.workflow.create({
      data: {
        workspaceId: workflow.workspaceId,
        name: `${workflow.name} (Copy)`,
        schemaConfig: workflow.schemaConfig || {},
        status: 'DRAFT',
      },
    });
  }

  async remove(id: string, userId: string) {
    const workflow = await this.findOne(id, userId);

    return this.prisma.workflow.update({
      where: { id: workflow.id },
      data: { isDeleted: true },
    });
  }
}

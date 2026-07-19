import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { SystemRole } from '@prisma/client';

@Injectable()
export class WorkspaceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(organizationId: string, userId: string, dto: CreateWorkspaceDto) {
    const member = await this.prisma.member.findFirst({
      where: { organizationId, userId },
      include: { role: true },
    });

    if (!member || (member.role.systemRole !== SystemRole.ORG_OWNER && member.role.systemRole !== SystemRole.ORG_ADMIN)) {
      throw new ForbiddenException('Only Organization Admins can create workspaces');
    }

    const workspace = await this.prisma.workspace.create({
      data: {
        organizationId,
        name: dto.name,
        description: dto.description,
      },
    });

    // Optionally assign creator to this workspace explicitly
    await this.prisma.member.create({
      data: {
        userId,
        organizationId,
        workspaceId: workspace.id,
        roleId: member.roleId,
      },
    });

    return workspace;
  }

  async findAllByOrganization(organizationId: string, userId: string) {
    // Check if user is part of the org
    const member = await this.prisma.member.findFirst({
      where: { organizationId, userId },
    });

    if (!member) throw new ForbiddenException('Not a member of this organization');

    return this.prisma.workspace.findMany({
      where: { organizationId, isDeleted: false },
    });
  }
}

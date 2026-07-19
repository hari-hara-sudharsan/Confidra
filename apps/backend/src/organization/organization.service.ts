import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { SystemRole } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrganizationDto) {
    // Determine the ORG_OWNER role ID
    let ownerRole = await this.prisma.role.findFirst({
      where: { systemRole: SystemRole.ORG_OWNER },
    });

    if (!ownerRole) {
      ownerRole = await this.prisma.role.create({
        data: { name: 'Organization Owner', systemRole: SystemRole.ORG_OWNER },
      });
    }

    const org = await this.prisma.organization.create({
      data: {
        name: dto.name,
        apiKeys: {
          create: {
            name: 'Default Key',
            keyHash: `sk_test_${uuidv4().replace(/-/g, '')}`,
          }
        },
        members: {
          create: {
            userId,
            roleId: ownerRole.id,
          },
        },
        settings: {
          create: {
            billingTier: 'FREE',
          }
        }
      },
    });
    return org;
  }

  async findAllForUser(userId: string) {
    return this.prisma.organization.findMany({
      where: {
        members: { some: { userId } },
        isDeleted: false,
      },
    });
  }

  async findOne(orgId: string, userId: string) {
    const org = await this.prisma.organization.findFirst({
      where: { id: orgId, members: { some: { userId } }, isDeleted: false },
    });
    if (!org) throw new NotFoundException('Organization not found');
    return org;
  }

  async update(orgId: string, dto: UpdateOrganizationDto, userId: string) {
    // Basic RBAC: Ensure user is OWNER or ADMIN
    const member = await this.prisma.member.findFirst({
      where: { organizationId: orgId, userId },
      include: { role: true },
    });

    if (!member || (member.role.systemRole !== SystemRole.ORG_OWNER && member.role.systemRole !== SystemRole.ORG_ADMIN)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.organization.update({
      where: { id: orgId },
      data: dto,
    });
  }

  async remove(orgId: string, userId: string) {
    const member = await this.prisma.member.findFirst({
      where: { organizationId: orgId, userId },
      include: { role: true },
    });

    if (!member || member.role.systemRole !== SystemRole.ORG_OWNER) {
      throw new ForbiddenException('Only the owner can delete the organization');
    }

    return this.prisma.organization.update({
      where: { id: orgId },
      data: { isDeleted: true },
    });
  }
}

import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { InviteMemberDto } from './dto/invite-member.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SystemRole } from '@prisma/client';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async invite(organizationId: string, inviterId: string, dto: InviteMemberDto) {
    // 1. Verify inviter is ORG_ADMIN or ORG_OWNER
    const inviter = await this.prisma.member.findFirst({
      where: { organizationId, userId: inviterId },
      include: { role: true },
    });

    if (!inviter || (inviter.role.systemRole !== SystemRole.ORG_OWNER && inviter.role.systemRole !== SystemRole.ORG_ADMIN)) {
      throw new ForbiddenException('Insufficient permissions to invite members');
    }

    // 2. Find or create user placeholder by email
    let targetUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!targetUser) {
      targetUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          walletAddress: `pending_${Date.now()}_${Math.random().toString(36).substring(7)}`, // Placeholder
        },
      });
    }

    // 3. Check if already member
    const existingMember = await this.prisma.member.findFirst({
      where: { organizationId, userId: targetUser.id, workspaceId: dto.workspaceId || null },
    });

    if (existingMember) throw new ConflictException('User is already a member');

    // 4. Create membership
    return this.prisma.member.create({
      data: {
        organizationId,
        userId: targetUser.id,
        roleId: dto.roleId,
        workspaceId: dto.workspaceId,
      },
      include: { user: true, role: true },
    });
  }

  async listMembers(organizationId: string, userId: string) {
    const member = await this.prisma.member.findFirst({
      where: { organizationId, userId },
    });
    if (!member) throw new ForbiddenException('Not a member');

    return this.prisma.member.findMany({
      where: { organizationId },
      include: { user: true, role: true, workspace: true },
    });
  }

  async updateRole(organizationId: string, memberId: string, updaterId: string, dto: UpdateRoleDto) {
    const updater = await this.prisma.member.findFirst({
      where: { organizationId, userId: updaterId },
      include: { role: true },
    });

    if (!updater || (updater.role.systemRole !== SystemRole.ORG_OWNER && updater.role.systemRole !== SystemRole.ORG_ADMIN)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.member.update({
      where: { id: memberId },
      data: { roleId: dto.roleId },
    });
  }

  async removeMember(organizationId: string, memberId: string, removerId: string) {
    const remover = await this.prisma.member.findFirst({
      where: { organizationId, userId: removerId },
      include: { role: true },
    });

    if (!remover || (remover.role.systemRole !== SystemRole.ORG_OWNER && remover.role.systemRole !== SystemRole.ORG_ADMIN)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.member.delete({
      where: { id: memberId },
    });
  }
}

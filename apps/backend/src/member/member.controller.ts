import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { InviteMemberDto } from './dto/invite-member.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Members')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('organizations/:orgId/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('invite')
  @ApiOperation({ summary: 'Invite a user to the organization or workspace' })
  invite(
    @Param('orgId') orgId: string,
    @CurrentUser() user: User,
    @Body() dto: InviteMemberDto,
  ) {
    return this.memberService.invite(orgId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all members in the organization' })
  findAll(
    @Param('orgId') orgId: string,
    @CurrentUser() user: User,
  ) {
    return this.memberService.listMembers(orgId, user.id);
  }

  @Patch(':memberId/role')
  @ApiOperation({ summary: 'Update a member\'s role' })
  updateRole(
    @Param('orgId') orgId: string,
    @Param('memberId') memberId: string,
    @CurrentUser() user: User,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.memberService.updateRole(orgId, memberId, user.id, dto);
  }

  @Delete(':memberId')
  @ApiOperation({ summary: 'Remove a member from the organization' })
  remove(
    @Param('orgId') orgId: string,
    @Param('memberId') memberId: string,
    @CurrentUser() user: User,
  ) {
    return this.memberService.removeMember(orgId, memberId, user.id);
  }
}

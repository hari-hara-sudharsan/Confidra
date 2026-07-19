import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class InviteMemberDto {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsUUID()
  @IsNotEmpty()
  roleId!: string;

  @IsUUID()
  @IsOptional()
  workspaceId?: string;
}

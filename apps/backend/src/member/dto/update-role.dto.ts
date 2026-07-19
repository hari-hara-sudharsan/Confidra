import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateRoleDto {
  @IsUUID()
  @IsNotEmpty()
  roleId!: string;
}

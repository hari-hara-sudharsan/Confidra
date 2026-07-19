import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreatePolicyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  organizationId!: string;

  @IsUUID()
  @IsOptional()
  workflowId?: string;
}

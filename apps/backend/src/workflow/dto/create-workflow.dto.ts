import { IsString, IsNotEmpty, IsOptional, IsObject, IsUUID } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsUUID()
  @IsNotEmpty()
  workspaceId!: string;

  @IsUUID()
  @IsOptional()
  templateId?: string;

  @IsObject()
  @IsOptional()
  schemaConfig?: Record<string, any>;
}

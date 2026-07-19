import { IsString, IsOptional, IsObject, IsEnum } from 'class-validator';

export enum WorkflowStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export class UpdateWorkflowDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(WorkflowStatus)
  @IsOptional()
  status?: string;

  @IsObject()
  @IsOptional()
  schemaConfig?: Record<string, any>;

  @IsString()
  @IsOptional()
  aiPromptHash?: string;
}

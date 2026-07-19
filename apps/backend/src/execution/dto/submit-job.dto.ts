import { IsUUID, IsNotEmpty, IsObject } from 'class-validator';

export class SubmitJobDto {
  @IsUUID()
  @IsNotEmpty()
  workflowId!: string;

  @IsObject()
  @IsNotEmpty()
  payload!: Record<string, any>;
}

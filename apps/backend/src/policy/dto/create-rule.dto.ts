import { IsString, IsNotEmpty, IsObject, IsUUID } from 'class-validator';

export class CreateRuleDto {
  @IsUUID()
  @IsNotEmpty()
  policyId!: string;

  @IsObject()
  @IsNotEmpty()
  condition!: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  action!: string;
}

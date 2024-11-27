import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStepDto {
  @IsNotEmpty()
  requestId: number;

  @IsNotEmpty()
  steps: Step[];
}

export class Step {
  @IsNotEmpty()
  actor: string;

  @IsNotEmpty()
  accept: string;

  @IsOptional()
  reject: string;
}
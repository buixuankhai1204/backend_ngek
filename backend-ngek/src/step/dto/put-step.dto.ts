import { IsNotEmpty, IsOptional } from 'class-validator';

export class PutStepDto {
  @IsNotEmpty()
  actorId: number;

  @IsNotEmpty()
  requestId: number;

  @IsNotEmpty()
  status: string;

  @IsOptional()
  feedback: string;
}

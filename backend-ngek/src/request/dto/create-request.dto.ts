import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  requestType: string;

  @IsNotEmpty()
  ownerId: number;

  @IsNotEmpty()
  totalStep: number;

  @IsOptional()
  content: string;

  @IsOptional()
  currentStatus: string;
}

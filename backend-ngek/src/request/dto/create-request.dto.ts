import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  requestType: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  ownerId: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  totalStep: number;

  @IsOptional()
  @ApiProperty({ required: false, default: '' })
  content: string;

  @IsOptional()
  @ApiProperty({ required: false, default: 'waiting' })
  currentStatus: string;
}

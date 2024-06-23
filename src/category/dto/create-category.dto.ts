import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCategoryDto {
  @IsNotEmpty()
  parentCategoryId: Types.ObjectId;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  isActive: number;
}

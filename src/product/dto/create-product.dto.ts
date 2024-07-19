import {
  IsBoolean,
  IsNotEmpty,
  IsOptional, Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  @Length(5)
  description: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsNotEmpty()
  minPrice: number;

  @IsNotEmpty()
  maxPrice: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

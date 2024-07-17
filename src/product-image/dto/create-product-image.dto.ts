import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateProductImageDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsOptional()
  isMail: boolean;
}

export class GetImagesByProductIdDto {
  @IsNotEmpty()
  @Length(24, 24)
  productId: string;
}

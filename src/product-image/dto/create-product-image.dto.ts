import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductImageDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}

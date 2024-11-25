import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProductImageDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(4)
  imageUrl: string;
}

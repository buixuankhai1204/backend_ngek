import { IsNotEmpty } from 'class-validator';

export class CreateProductVoucherDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  voucherId: string;
}

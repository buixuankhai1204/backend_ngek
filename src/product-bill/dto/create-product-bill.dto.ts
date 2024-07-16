import { IsNotEmpty } from 'class-validator';

export class CreateProductBillDto {
  @IsNotEmpty()
  productId: string

  @IsNotEmpty()
  quantity: string

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  size: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreateProductOrderDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  quantity: number;
}

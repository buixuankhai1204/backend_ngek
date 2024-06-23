import { IsNotEmpty } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

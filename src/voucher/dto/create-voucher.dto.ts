import { IsNotEmpty } from 'class-validator';
import { ETypeVoucher } from '../schemas/voucher.schema';

export class CreateVoucherDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  type: ETypeVoucher;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  quantity: number;
}

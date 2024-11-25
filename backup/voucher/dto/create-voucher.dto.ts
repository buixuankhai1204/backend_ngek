import { IsNotEmpty, IsOptional } from 'class-validator';
import { ETypeVoucher } from '../schemas/voucher.schema';

export class CreateVoucherDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  type: ETypeVoucher;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  quantity: number;
}

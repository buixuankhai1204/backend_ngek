import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVoucherDto } from './create-product-voucher.dto';

export class UpdateProductVoucherDto extends PartialType(CreateProductVoucherDto) {}

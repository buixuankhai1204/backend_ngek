import { PartialType } from '@nestjs/mapped-types';
import { CreateProductBillDto } from './create-product-bill.dto';

export class UpdateProductBillDto extends PartialType(CreateProductBillDto) {}

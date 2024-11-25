import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductVoucherService } from './product-voucher.service';
import { CreateProductVoucherDto } from './dto/create-product-voucher.dto';
import { IResponse } from '../ultility/interfaceModel';
import { ProductVoucher } from './schemas/product-voucher.schema';
import { Types } from 'mongoose';

@Controller('product-voucher')
export class ProductVoucherController {
  constructor(private readonly productVoucherService: ProductVoucherService) {
  }

  @Post()
  create(@Body() createProductVoucherDto: CreateProductVoucherDto[]): Promise<IResponse<ProductVoucher>> {
    return this.productVoucherService.create(createProductVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<ProductVoucher>> {
    return this.productVoucherService.forceRemove(new Types.ObjectId(id));
  }

  @Get(':productId')
  findVouchersByProductId(@Param('productId') productId: string): Promise<IResponse<ProductVoucher>> {
    return this.productVoucherService.findVouchersByProductId(new Types.ObjectId(productId));
  }
}

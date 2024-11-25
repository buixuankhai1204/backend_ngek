import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductBillService } from './product-bill.service';
import { CreateProductBillDto } from './dto/create-product-bill.dto';
import { UpdateProductBillDto } from './dto/update-product-bill.dto';
import { IResponse } from '../ultility/interfaceModel';
import { ProductBill } from './schemas/product-bill.schema';
import { Types } from 'mongoose';

@Controller('product-bill')
export class ProductBillController {
  constructor(private readonly productBillService: ProductBillService) {
  }

  @Post()
  create(@Body() createProductBillDto: CreateProductBillDto[]): Promise<IResponse<ProductBill>> {
    return this.productBillService.create(createProductBillDto);
  }

  @Get()
  findAll(): Promise<IResponse<ProductBill>> {
    return this.productBillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<ProductBill>> {
    return this.productBillService.findOne(new Types.ObjectId(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductBillDto: UpdateProductBillDto[]): Promise<IResponse<ProductBill>> {
    return this.productBillService.update(updateProductBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<ProductBill>> {
    return this.productBillService.forceRemove(new Types.ObjectId(id));
  }
}

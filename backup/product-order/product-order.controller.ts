import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { IResponse } from '../ultility/interfaceModel';
import { ProductOrder } from './schemas/product-order.schema';
import { Types } from 'mongoose';

@Controller('product-order')
export class ProductOrderController {
  constructor(private readonly productOrderService: ProductOrderService) {
  }

  @Post()
  create(@Body() createProductOrderDto: CreateProductOrderDto[]): Promise<IResponse<ProductOrder>> {
    return this.productOrderService.create(createProductOrderDto);
  }

  @Patch(':id')
  update(@Body() updateProductOrderDto: UpdateProductOrderDto[]): Promise<IResponse<ProductOrder>> {
    return this.productOrderService.update(updateProductOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<ProductOrder>> {
    return this.productOrderService.forceRemove(new Types.ObjectId(id));
  }
}

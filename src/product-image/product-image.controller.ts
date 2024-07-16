import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { IResponse } from '../ultility/interfaceModel';
import { ProductImage } from './schemas/productImage.schema';
import { Types } from 'mongoose';

@Controller('product-image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post()
  create(@Body() createProductImageDto: CreateProductImageDto): Promise<IResponse<ProductImage>> {
    return this.productImageService.create(createProductImageDto);
  }

  @Get()
  findAll(): Promise<IResponse<ProductImage>>  {
    return this.productImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<ProductImage>>  {
    return this.productImageService.findOne(new Types.ObjectId(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductImageDto: UpdateProductImageDto): Promise<IResponse<ProductImage>> {
    return this.productImageService.updateOne(new Types.ObjectId(id), updateProductImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<ProductImage>> {
    return this.productImageService.remove(new Types.ObjectId(id));
  }
}

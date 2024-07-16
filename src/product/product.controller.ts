import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Types } from 'mongoose';
import { IResponse } from '../ultility/interfaceModel';
import { Product } from './schemas/product.schema';
import { UploadImagesDto } from './dto/upload-images.dto';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<IResponse<Product>> {
    return await this.productService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<IResponse<Product>> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Product>> {
    return this.productService.findOne(new Types.ObjectId(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<IResponse<Product>> {
    return this.productService.updateOne(
      new Types.ObjectId(id),
      updateProductDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<Product>> {
    return this.productService.remove(new Types.ObjectId(id));
  }

  @Post()
  addNewVoucherForProduct(@Body('productId') productId: string,
                          @Body('voucherId') voucherId: string): Promise<IResponse<void>> {
    return this.productService.addNewVoucherForProduct(new Types.ObjectId(productId), new Types.ObjectId(voucherId));
  }

  @Post()
  uploadImages(@Body('uploadImagesDto') uploadImagesDto: UploadImagesDto): Promise<IResponse<void>> {
      return this.productService.uploadImages(uploadImagesDto);
  }
}

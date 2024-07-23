import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { FindOneParams, IResponse } from '../ultility/interfaceModel';
import { ProductImage } from './schemas/product-image.schema';
import { Types } from 'mongoose';
import {
  Filtering,
  FilteringParams,
  Pagination,
  PaginationParams,
  Sorting,
  SortingParams,
} from '../decorators/baseService.decorator';

@Controller('product-image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {
  }

  @Post()
  create(@Body() createProductImageDto: CreateProductImageDto[]): Promise<IResponse<ProductImage>> {
    return this.productImageService.create(createProductImageDto);
  }

  @Get()
  findAll(
    @PaginationParams() pagination: Pagination,
    @SortingParams(['name', 'minPrice', 'maxPrice']) sort?: Sorting,
    @FilteringParams(['name']) filter?: Filtering
  ): Promise<IResponse<ProductImage>> {
    return this.productImageService.findAll(filter, sort, pagination);
  }

  @Get('/product/:id')
  findListImagesByProductId(@Param() product: FindOneParams): Promise<IResponse<ProductImage>> {
    return this.productImageService.findListImagesByProductId(new Types.ObjectId(product.id));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<ProductImage>>  {
    return this.productImageService.findOne(new Types.ObjectId(id));
  }

  @Patch(':id')
  update(@Param() id: FindOneParams, @Body() updateProductImageDto: UpdateProductImageDto): Promise<IResponse<ProductImage>> {
    return this.productImageService.updateOne(new Types.ObjectId(id.id), updateProductImageDto);
  }

  @Delete(':id')
  remove(@Param() id: FindOneParams): Promise<IResponse<ProductImage>> {
    return this.productImageService.forceRemove(new Types.ObjectId(id.id));
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UsePipes,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Types } from 'mongoose';
import { FindOneParams, IResponse } from '../ultility/interfaceModel';
import { Product } from './schemas/product.schema';
import { CreateProductImageDto } from '../product-image/dto/create-product-image.dto';
import {
  Filtering,
  FilteringParams,
  Pagination,
  PaginationParams,
  Sorting,
  SortingParams,
} from '../decorators/baseService.decorator';
import { NoFieldValidationPipe } from '../ultility/vaildation';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto[]): Promise<IResponse<Product>> {
    return await this.productService.create(createProductDto);
  }

  @Get()
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'minPrice', 'maxPrice']) sort?: Sorting,
    @FilteringParams(['name']) filter?: Filtering): Promise<IResponse<Product>> {
    return this.productService.findAll(filter, sort, paginationParams);
  }

  @Get('/:id')
  findOne(@Param() id: FindOneParams): Promise<IResponse<Product>> {
    return this.productService.findOne(new Types.ObjectId(id.id));
  }

  @Patch(':id')
  @UsePipes(new NoFieldValidationPipe<UpdateProductDto>(['name']))
  update(@Param() id: FindOneParams, @Body() updateProductDto: UpdateProductDto): Promise<IResponse<Product>> {
    return this.productService.updateOne(
      new Types.ObjectId(id.id),
      updateProductDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<Product>> {
    return this.productService.remove(new Types.ObjectId(id));
  }

  @Post()
  addNewVoucherForProduct(@Body() productId: FindOneParams,
                          @Body() voucherId: string): Promise<IResponse<void>> {
    return this.productService.addNewVoucherForProduct(new Types.ObjectId(productId.id), new Types.ObjectId(voucherId));
  }
}

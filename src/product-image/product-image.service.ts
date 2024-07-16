import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise, Types } from 'mongoose';
import { ProductImage } from './schemas/productImage.schema';
import { Service } from '../decorators/baseService.decorator';
import { IResponse } from '../ultility/interfaceModel';

@Injectable()
export class ProductImageService extends Service<ProductImage, CreateProductImageDto, UpdateProductImageDto>{
  constructor(
    @InjectModel(ProductImage.name) private productImageModel: Model<ProductImage>,
  ) {
    super(productImageModel)
  }

  findOneCustom(id: Types.ObjectId): Promise<IResponse<unknown>> {
    return Promise.resolve(undefined);
  }
}

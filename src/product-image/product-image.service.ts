import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise, Types } from 'mongoose';
import { ProductImage } from './schemas/product-image.schema';
import { Service } from '../decorators/baseService.decorator';
import { IResponse } from '../ultility/interfaceModel';

@Injectable()
export class ProductImageService extends Service<ProductImage, CreateProductImageDto, UpdateProductImageDto> {
  constructor(
    @InjectModel(ProductImage.name) private productImageModel: Model<ProductImage>,
  ) {
    super(productImageModel);
  }

  async findListImagesByProductId(productId: Types.ObjectId): Promise<IResponse<ProductImage>> {
    const listProductImage = await this.productImageModel.find({ productId: productId });

    return {
      statusCode: 200,
      message: 'get list images by product id success',
      total: listProductImage.length,
      data: listProductImage,
    };
  }
}

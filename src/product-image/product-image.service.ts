import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError, Types } from 'mongoose';
import { ProductImage } from './schemas/product-image.schema';
import { Service } from '../decorators/baseService.decorator';
import { IResponse } from '../ultility/interfaceModel';
import { Product } from '../product/schemas/product.schema';

@Injectable()
export class ProductImageService extends Service<ProductImage, CreateProductImageDto, UpdateProductImageDto> {
  constructor(
    @InjectModel(ProductImage.name) private productImageModel: Model<ProductImage>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {
    super(productImageModel);
  }

  async create(createProductImageDto: CreateProductImageDto[]): Promise<IResponse<ProductImage>> {
    try {
      const filterProducts = createProductImageDto.filter((dto) => dto.productId !== createProductImageDto[0].productId);
      if (filterProducts.length > 0) {
        throw new BadRequestException('Can not upload images for more products at the same time');
      }

      const product = await this.productModel.findById(createProductImageDto[0].productId);
      if (!product) {
        throw new BadRequestException('Can not find product by this id');
      }

      const data = await this.productImageModel.create(createProductImageDto);
      if (!data) {
        throw new BadRequestException('Can not add list image for this product');
      }

      return {
        statusCode: 200,
        message: 'Add list images by product id success',
        total: data.length,
        data: data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }

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

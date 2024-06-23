import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from '../decorators/baseService.decorator';

@Injectable()
export class ProductService extends Service<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    super(productModel);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = await this.productModel.create(createProductDto);
    if (!product) {
      throw new BadRequestException(
        'can not create this product, please check again!',
      );
    }

    return product;
  }

  async findOne(id: Types.ObjectId): Promise<Product> {
    const product: Product[] = await this.productModel.find({
      _id: id,
      isActive: 1,
    });
    if (!product) {
      throw new BadRequestException(
        'id of product does not exist, please check this again',
        { cause: new Error(), description: 'Some error description' },
      );
    }

    return product[0];
  }

  async remove(id: string) {
    const deleteProduct: Product | null =
      await this.productModel.findByIdAndUpdate(
        id,
        { isActive: 0 },
        { new: true },
      );
    if (!deleteProduct) {
      throw new BadRequestException(
        'id of product does not exist, please check this again',
        { cause: new Error(), description: 'Some error description' },
      );
    }

    return deleteProduct;
  }
}

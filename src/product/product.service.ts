import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { Service } from '../decorators/baseService.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IResponse } from '../ultility/interfaceModel';
import { Voucher } from '../voucher/schemas/voucher.schema';
import { ProductVoucher } from '../product-voucher/schemas/product-voucher.schema';
import { ProductImage } from '../product-image/schemas/product-image.schema';
import { CreateProductImageDto } from '../product-image/dto/create-product-image.dto';

@Injectable()
export class ProductService extends Service<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Voucher.name) private voucherModel: Model<Voucher>,
    @InjectModel(ProductVoucher.name) private productVoucherModel: Model<ProductVoucher>,
    @InjectModel(ProductImage.name) private productImageModel: Model<ProductImage>,
  ) {
    super(productModel);
  }

  async addNewVoucherForProduct(productId: Types.ObjectId, voucherId: Types.ObjectId): Promise<IResponse<void>> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new BadRequestException('Can not find product by this id');
    }

    const voucher = await this.voucherModel.findById(voucherId);
    if (!voucher) {
      throw new BadRequestException('Can not find voucher by this id');
    }

    await this.productVoucherModel.create({ voucherId, productId });

    return {
      statusCode: 200,
      message: 'create new bill success',
      total: 0,
      data: [],
    };
  }
}

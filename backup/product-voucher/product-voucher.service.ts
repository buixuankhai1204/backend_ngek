import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductVoucherDto } from './dto/create-product-voucher.dto';
import { UpdateProductVoucherDto } from './dto/update-product-voucher.dto';
import { Service } from '../decorators/baseService.decorator';
import { ProductVoucher } from './schemas/product-voucher.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IResponse } from '../ultility/interfaceModel';
import { Product } from '../product/schemas/product.schema';

@Injectable()
export class ProductVoucherService extends Service<ProductVoucher, CreateProductVoucherDto, UpdateProductVoucherDto> {
  constructor(
    @InjectModel(ProductVoucher.name) private productVoucherModel: Model<ProductVoucher>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {
    super(productVoucherModel);
  }

  async create(createRequest: CreateProductVoucherDto[]): Promise<IResponse<ProductVoucher>> {
    const filterProducts = createRequest.filter((dto) => dto.productId !== createRequest[0].productId);
    if (filterProducts.length > 0) {
      throw new BadRequestException('Can not upload images for more products at the same time');
    }

    const product = await this.productModel.findById(createRequest[0].productId);
    if (!product) {
      throw new BadRequestException('Can not find product by this id');
    }

    const data = await this.productVoucherModel.create(createRequest);
    if (!data) {
      throw new BadRequestException('Can not add list vouchers for this product');
    }

    return {
      statusCode: 200,
      message: 'Add list vouchers for product by product id success',
      total: data.length,
      data: data,
    };
  }

  async findVouchersByProductId(productId: Types.ObjectId): Promise<IResponse<ProductVoucher>> {
    const vouchers = await this.productVoucherModel.find({
      productId: productId,
    });

    if (!vouchers) {
      throw new BadRequestException('No voucher found');
    }

    return {
      statusCode: 200,
      message: 'Find vouchers  in product success',
      total: vouchers.length,
      data: vouchers,
    };
  }
}

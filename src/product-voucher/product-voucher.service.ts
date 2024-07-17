import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductVoucherDto } from './dto/create-product-voucher.dto';
import { UpdateProductVoucherDto } from './dto/update-product-voucher.dto';
import { Service } from '../decorators/baseService.decorator';
import { ProductVoucher } from './schemas/product-voucher.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IResponse } from '../ultility/interfaceModel';

@Injectable()
export class ProductVoucherService extends Service<ProductVoucher, CreateProductVoucherDto, UpdateProductVoucherDto> {
  constructor(
    @InjectModel(ProductVoucher.name) private productVoucherModel: Model<ProductVoucher>,
  ) {
    super(productVoucherModel);
  }

  async findVouchersByProductId(productId: Types.ObjectId): Promise<IResponse<ProductVoucher>> {
    const vouchers = await this.productVoucherModel.find({
      productId: productId,
    }).populate('Voucher');

    if(!vouchers) {
      throw new BadRequestException('No voucher found');
    }

    return {
      statusCode: 200,
      message: 'Create products in bill success',
      total: vouchers.length,
      data: vouchers,
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IResponse } from '../ultility/interfaceModel';
import { Service } from '../decorators/baseService.decorator';
import { ProductBill } from './schemas/product-bill.schema';
import { CreateProductBillDto } from './dto/create-product-bill.dto';
import { UpdateProductBillDto } from './dto/update-product-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductQuantity } from '../product/schemas/product.schema';

@Injectable()
export class ProductBillService extends Service<ProductBill, CreateProductBillDto, UpdateProductBillDto> {
  constructor(
    @InjectModel(ProductBill.name) private productBillModel: Model<ProductBill>,
    @InjectModel(ProductQuantity.name) private productQuantityModel: Model<ProductQuantity>,
  ) {
    super(productBillModel);
  }

  async create(createProductBillDto: CreateProductBillDto[]): Promise<IResponse<ProductBill>> {
    const newListProductForBill: ProductBill[] = await this.productBillModel.create(createProductBillDto);

    if (!newListProductForBill.length) {
      throw new BadRequestException('Can not create new List Products for this bill');
    }

    const bulkOps = newListProductForBill.map(update => ({
      updateOne: {
        filter: { productId: update.productId, color: update.color, size: update.size },
        update: { $inc: { quantity: update.quantity } },
        upsert: true
      },
    }));

    await this.productQuantityModel.bulkWrite(bulkOps);

    return {
      statusCode: 200,
      message: 'Create products in bill success',
      total: newListProductForBill.length,
      data: newListProductForBill,
    };
  }

  async update( products: UpdateProductBillDto[]): Promise<IResponse<ProductBill>> {
    const bulkUpdateProductQuantity = products.map(product => {
        return [
          ({
            updateOne: {
              filter: { productId: product.productId },
              update: { $inc: { quantity: product.quantity } },
            },
          }),
          ({
            updateOne: {
              filter: { billId: product.billId },
              update: { $set: product },
            },
          }),
        ];
      },
    );
    await this.productQuantityModel.bulkWrite(bulkUpdateProductQuantity[0]);
    await this.productBillModel.bulkWrite(bulkUpdateProductQuantity[1]);

    return {
      statusCode: 200,
      message: 'Update products in bill success',
      total: products.length,
      data: [],
    };
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';
import { Service } from '../decorators/baseService.decorator';
import { ProductOrder } from './schemas/product-order.schema';
import { IResponse } from '../ultility/interfaceModel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../order/schemas/order.schema';
import { ProductQuantity } from '../product/schemas/product.schema';

@Injectable()
export class ProductOrderService extends Service<ProductOrder, CreateProductOrderDto, UpdateProductOrderDto> {
  constructor(
    @InjectModel(ProductOrder.name) private readonly productOrderModel: Model<ProductOrder>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(ProductQuantity.name) private readonly productQuantityModel: Model<ProductQuantity>,
  ) {
    super(productOrderModel);
  }

  async create(createProductOrderDto: CreateProductOrderDto[]): Promise<IResponse<ProductOrder>> {
    const order = await this.orderModel.findById(createProductOrderDto[0].orderId);
    if (!order) {
      throw new BadRequestException('Can not find order by this orderId');
    }

    const newProductsOrder = await this.productOrderModel.create(createProductOrderDto);
    if (!newProductsOrder) {
      throw new BadRequestException('Can not create list products for this order');
    }

    const bulkOps = newProductsOrder.map(update => ({
      updateOne: {
        filter: { productId: update.productId },
        update: { $inc: { quantity: update.quantity } },
      },
    }));

    await this.productQuantityModel.bulkWrite(bulkOps);

    return {
      statusCode: 200,
      message: 'Create products in bill success',
      total: newProductsOrder.length,
      data: [],
    };
  }

  async update( updateProductOrderDto: UpdateProductOrderDto[]): Promise<IResponse<ProductOrder>> {
    const bulkUpdateProductQuantity = updateProductOrderDto.map(product => {
        return [
          ({
            updateOne: {
              filter: { productId: product.productId },
              update: { $inc: { quantity: product.quantity } },
            },
          }),
          ({
            updateOne: {
              filter: { orderId: product.orderId },
              update: { $set: product },
            },
          }),
        ];
      },
    );
    await this.productQuantityModel.bulkWrite(bulkUpdateProductQuantity[0]);
    await this.productOrderModel.bulkWrite(bulkUpdateProductQuantity[1]);

    return {
      statusCode: 200,
      message: 'Update products in bill success',
      total: updateProductOrderDto.length,
      data: [],
    };
  }
}

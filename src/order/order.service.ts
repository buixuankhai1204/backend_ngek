import {  Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { Service } from '../decorators/baseService.decorator';

@Injectable()
export class OrderService extends Service<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {
    super(orderModel);
  }

  // async create(createOrderDto: CreateOrderDto): Promise<IResponse<Order>> {
  //
  // }
}

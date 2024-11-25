import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { Service } from '../decorators/baseService.decorator';
import { IResponse } from '../ultility/interfaceModel';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class OrderService extends Service<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
    ) {
    super(orderModel);
  }

  async create(createOrderDto: CreateOrderDto[]): Promise<IResponse<Order>> {
    const user = await this.userModel.findById(createOrderDto[0].userId);
    if (!user) {
      throw new BadRequestException(`User with id ${createOrderDto[0].userId} not found`);
    }

    const newOrders = await this.orderModel.create(createOrderDto);
    if (!newOrders.length) {
      throw new BadRequestException(`Can not create new Order`);
    }

    return {
      statusCode: 201,
      message: 'Create orders success',
      total: 1,
      data: newOrders,
    }
  }
}

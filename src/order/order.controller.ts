import {
  Body,
  Controller, Delete, Get, Param, Patch, Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../user/user.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IResponse } from '../ultility/interfaceModel';
import { Order } from './schemas/order.schema';
import { Types } from 'mongoose';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto[]): Promise<IResponse<Order>> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(): Promise<IResponse<Order>> {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Order>> {
    return this.orderService.findOne(new Types.ObjectId(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<IResponse<Order>> {
    return this.orderService.updateOne(new Types.ObjectId(id), updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<Order>> {
    return this.orderService.remove(new Types.ObjectId(id));
  }
}

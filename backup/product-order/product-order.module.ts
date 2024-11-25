import { Module } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { ProductOrderController } from './product-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductOrder, ProductOrderSchema } from './schemas/product-order.schema';
import { Order, OrderSchema } from '../order/schemas/order.schema';
import { ProductQuantity, ProductQuantitySchema } from '../product/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductOrder.name, schema: ProductOrderSchema },
      { name: Order.name, schema: OrderSchema },
      { name: ProductQuantity.name, schema: ProductQuantitySchema },
    ]),
  ],
  controllers: [ProductOrderController],
  providers: [ProductOrderService],
})
export class ProductOrderModule {}

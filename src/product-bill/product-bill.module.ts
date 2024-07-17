import { Module } from '@nestjs/common';
import { ProductBillService } from './product-bill.service';
import { ProductBillController } from './product-bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductBillSchema } from './schemas/product-bill.schema';
import { ProductBill } from './schemas/product-bill.schema';
import { ProductQuantity, ProductQuantitySchema } from '../product/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductBill.name, schema: ProductBillSchema },
      { name: ProductQuantity.name, schema: ProductQuantitySchema },
    ]),
  ],
  controllers: [ProductBillController],
  providers: [ProductBillService],
})
export class ProductBillModule {
}

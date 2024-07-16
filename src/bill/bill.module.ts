import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './schemas/bill.schema';
import { Supply, SupplySchema } from '../supply/schemas/supply.schema';
import { ProductBill, ProductBillSchema } from '../product/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: Bill.name, schema: BillSchema },
      // { name: Supply.name, schema: SupplySchema },
      // { name: ProductBill.name, schema: ProductBillSchema },
    ]),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}

import { Module } from '@nestjs/common';
import { ProductBillService } from './product-bill.service';
import { ProductBillController } from './product-bill.controller';

@Module({
  controllers: [ProductBillController],
  providers: [ProductBillService],
})
export class ProductBillModule {}

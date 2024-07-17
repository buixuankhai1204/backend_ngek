import { Module } from '@nestjs/common';
import { ProductVoucherService } from './product-voucher.service';
import { ProductVoucherController } from './product-voucher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductVoucher, ProductVoucherSchema } from './schemas/product-voucher.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: ProductVoucher.name, schema: ProductVoucherSchema },
      ],
    ),
  ],
  controllers: [ProductVoucherController],
  providers: [ProductVoucherService],
})
export class ProductVoucherModule {}

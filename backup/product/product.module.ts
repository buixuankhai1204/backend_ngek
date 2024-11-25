import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { Voucher, VoucherSchema } from '../voucher/schemas/voucher.schema';
import { ProductVoucher, ProductVoucherSchema } from '../product-voucher/schemas/product-voucher.schema';
import { ProductImage, ProductImageSchema } from '../product-image/schemas/product-image.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Product.name, schema: ProductSchema },
        { name: Voucher.name, schema: VoucherSchema },
        { name: ProductVoucher.name, schema: ProductVoucherSchema },
        { name: ProductImage.name, schema: ProductImageSchema },
      ],
    ),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {
}

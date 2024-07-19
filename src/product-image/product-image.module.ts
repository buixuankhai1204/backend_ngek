import { Module } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { ProductImageController } from './product-image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductImage, ProductImageSchema } from './schemas/product-image.schema';
import { Product, ProductSchema } from '../product/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductImage.name,
        schema: ProductImageSchema, },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductImageController],
  providers: [ProductImageService],
})
export class ProductImageModule {
}

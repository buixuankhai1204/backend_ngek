import { Module } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { ProductImageController } from './product-image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductImage, ProductImageSchema } from './schemas/product-image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductImage.name, schema: ProductImageSchema },
    ]),
  ],
  controllers: [ProductImageController],
  providers: [ProductImageService],
})
export class ProductImageModule {}

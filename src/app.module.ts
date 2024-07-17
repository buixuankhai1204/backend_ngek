import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserAddressModule } from './user-address/user-address.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { BannerModule } from './banner/banner.module';
import { VoucherModule } from './voucher/voucher.module';
import { SupplyModule } from './supply/supply.module';
import { BillModule } from './bill/bill.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductBillModule } from './product-bill/product-bill.module';
import { ProductVoucherModule } from './product-voucher/product-voucher.module';
import { ProductOrderModule } from './product-order/product-order.module';
import databaseConfig from '../config/database.config';
import * as Joi from 'joi';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      load: [databaseConfig],
      cache: true,

      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(8000),
        DATABASE_USER: Joi.string().default(null),
        DATABASE_PASSWORD: Joi.string().default(null),
        HOST: Joi.string().default('localhost'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    UserAddressModule,
    UserModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    BannerModule,
    VoucherModule,
    SupplyModule,
    BillModule,
    ProductImageModule,
    ProductBillModule,
    ProductVoucherModule,
    ProductOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

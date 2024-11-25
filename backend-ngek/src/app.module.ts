import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { RequestModule } from './request/request.module';
import databaseConfig from '../config/database.config';
import * as Joi from 'joi';
import { PrismaModule } from './prisma/prisma.module';
import { StepModule } from './step/step.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [databaseConfig],
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_USER: Joi.string().default(null),
        DATABASE_PASSWORD: Joi.string().default(null),
        HOST: Joi.string().default('localhost'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    // UserAddressModule,
    // UserModule,
    // CategoryModule,
    // ProductModule,
    // OrderModule,
    // BannerModule,
    // VoucherModule,
    // SupplyModule,
    // BillModule,
    // ProductImageModule,
    // ProductBillModule,
    // ProductVoucherModule,
    // ProductOrderModule,
    PrismaModule,
    DepartmentModule,
    EmployeeModule,
    RequestModule,
    StepModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

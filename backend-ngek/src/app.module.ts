import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module.js';
import { EmployeeModule } from './employee/employee.module.js';
import { RequestModule } from './request/request.module.js';
import Joi from 'joi';
import { PrismaModule } from './prisma/prisma.module.js';
import { StepModule } from './step/step.module.js';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: ['.env'],
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
        abortEarly: true,
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

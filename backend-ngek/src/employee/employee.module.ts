import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service.js';
import { EmployeeController } from './employee.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [PrismaModule],
})
export class EmployeeModule {
}

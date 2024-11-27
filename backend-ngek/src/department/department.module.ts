import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service.js';
import { DepartmentController } from './department.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [PrismaModule],
})
export class DepartmentModule {
}

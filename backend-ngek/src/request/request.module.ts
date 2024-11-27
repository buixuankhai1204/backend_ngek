import { Module } from '@nestjs/common';
import { RequestService } from './request.service.js';
import { RequestController } from './request.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [PrismaModule],
})
export class RequestModule {
}

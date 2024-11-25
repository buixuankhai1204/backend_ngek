import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [PrismaModule],
})
export class RequestModule {
}

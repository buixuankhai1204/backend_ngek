import { Module } from '@nestjs/common';
import { StepService } from './step.service.js';
import { StepController } from './step.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { RequestModule } from '../request/request.module.js';
import { RequestService } from '../request/request.service.js';

@Module({
  controllers: [StepController],
  providers: [StepService, RequestService],
  imports: [PrismaModule, RequestModule],
})
export class StepModule {
}

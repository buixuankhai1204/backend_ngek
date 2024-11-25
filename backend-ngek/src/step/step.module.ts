import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { StepController } from './step.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [StepController],
  providers: [StepService],
  imports: [PrismaModule]
})
export class StepModule {}

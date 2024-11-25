import { Injectable, Logger } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PutStepDto } from './dto/put-step.dto';

@Injectable()
export class StepService {
  constructor(private prisma: PrismaService) {
  }

  create(createStepDto: CreateStepDto) {
    return 'This action adds a new step';
  }

  findAll() {
    return `This action returns all step`;
  }

  async stepAction(putStepDto: PutStepDto): Promise<unknown> {
    return this.prisma.$transaction(async (tx) => {
      try {
        console.log(putStepDto.actorId)
        const result = await tx.$queryRaw`
                SELECT *
                FROM "Request" "r"
                INNER JOIN "Step" "s" ON "r"."requestId" = "s"."requestId"
                WHERE "s"."actorId" = ${putStepDto.actorId};`
        ;
        console.log(result);
        return result;
      } catch (error) {
          Logger.error(error);
      }

    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} step`;
  // }
  //
  // update(id: number, updateStepDto: UpdateStepDto) {
  //   return `This action updates a #${id} step`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} step`;
  // }
}

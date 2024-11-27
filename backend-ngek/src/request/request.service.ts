import { Injectable, Logger } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto.js';
import { UpdateRequestDto } from './dto/update-request.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RequestEntity } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {
  }

  async create(createRequestDto: CreateRequestDto): Promise<RequestEntity> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const employee = await tx.employee.findUnique({ where: { employeeId: createRequestDto.ownerId } });
        if (!employee) {
          Logger.error('Can not find any employee match this id');
          return undefined;
        }
        return await tx.request.create({ data: createRequestDto });
      } catch (error) {
        Logger.log(error);
        return undefined;
      }
    });
  }

  findAllRequestByOwnerId(ownerId: number): Promise<RequestEntity[]> {
    return this.prisma.$transaction(async (tx) => {
      try {

        return tx.request.findMany({ where: { ownerId: ownerId } });
      } catch (error) {
        Logger.log(error);
        return undefined;
      }
    });
  }

  parseFileContentMnd(data: string[]): Promise<boolean> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const requestId = parseInt(data[0]?.split(' ')[1]);
        const map: Map<number, { actorId: number; parentStep: number }> = new Map();
        const stepIdByStepNumber: Map<number, number> = new Map();
        let initStepId = 0;
        let countStep = 1;
        let previousStepId = 0;
        let listSteps = [];

        const request = await tx.request.findUnique({ where: { requestId: requestId } });
        if (!request) {
          Logger.error('Can not find any request with this id');
          return false;
        }

        for (let i = 2; i < data.length; i++) {
          const informationStep = data[i].trim().split(' ');
          if (informationStep[0] === '%%') {
            map.set(countStep, {
              actorId: parseInt(informationStep[1].split('-')[0]),
              parentStep: parseInt(informationStep[1].split('-')[1]),
            });
            console.log(map.get(countStep));
            previousStepId = stepIdByStepNumber.get(map.get(countStep).parentStep ?? 0);
            const response = await tx.step.create({
              data: {
                previousStepId: previousStepId,
                actorId: map.get(countStep).actorId ?? map.get(countStep - 1).actorId,
                status: 'waiting',
                feedback: 'success send to next step',
                requestId: requestId,
              },
            });
            if (!response) {
              Logger.error('Can not find any request with this id');
              return false;
            }
            listSteps.push(response);
            stepIdByStepNumber.set(countStep, response.stepId);
            countStep++;
          }
        }
        console.log(listSteps);
        await tx.request.update({
          data: { currentStepId: listSteps[0].stepId ?? 0 },
          where: { requestId: listSteps[0].requestId ?? 0 },
        });
        return true;
      } catch (error) {
        Logger.log(error);
      }
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} request`;
  // }
  //
  // update(id: number, updateRequestDto: UpdateRequestDto) {
  //   return `This action updates a #${id} request`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} request`;
  // }
}

import { Injectable, Logger } from '@nestjs/common';
import { CreateStepDto, Step } from './dto/create-step.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PutStepDto } from './dto/put-step.dto.js';
import { EmployeeStep, RequestStep } from './entities/step.entity';
import * as fs from 'fs';
import { join } from 'path';
import { run } from '@mermaid-js/mermaid-cli';
import { RequestService } from '../request/request.service.js';

@Injectable()
export class StepService {
  constructor(private prisma: PrismaService,
              private requestService: RequestService) {
  }

  async create(createStepDtos: CreateStepDto): Promise<boolean> {
    try {
      return this.writeNewMndFile(createStepDtos);
    } catch (error) {
    }
  }

  findAll() {
    return `This action returns all step`;
  }

  async stepAction(putStepDto: PutStepDto): Promise<undefined | boolean> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const result: RequestStep[] = await tx.$queryRaw`
                SELECT *
                FROM "Request" "r"
                INNER JOIN "Step" "s" ON "r"."requestId" = "s"."requestId"
                WHERE "s"."actorId" = ${putStepDto.actorId} AND "r"."requestId"=${putStepDto.requestId};`
        ;
        if (!result.length || result[0].currentStepId !== result[0].stepId) {
          Logger.log('Can not do anything because you dont have permission');
          return undefined;
        }
        if (putStepDto.status === 'accept') {
          const nextstep = await tx.step.findFirst(
            { where: { stepId: result[0].stepId + 1 } },
          );
          if (!nextstep) {
            await this.writeFileStatus('completed');
            return true;
          }
          await tx.request.update({
            data: { currentStepId: nextstep.stepId },
            where: { requestId: result[0].requestId },
          });
          const employeeStep: EmployeeStep = await tx.$queryRaw`
          SELECT *
                FROM "Employee" "e"
                INNER JOIN "Step" "s" ON "s"."actorId" = "e"."employeeId"
                INNER JOIN "Request" "r" ON "r"."requestId" = "s"."requestId"
                WHERE "e"."employeeId" = ${nextstep.actorId}
                AND "s"."stepId" = ${nextstep.stepId};`
          console.log(employeeStep);
          await this.writeFileStatus(employeeStep[0].name);


        } else if (putStepDto.status === 'reject') {
          const employeeStep: EmployeeStep = await tx.$queryRaw`
          SELECT *
                FROM "Employee" "e"
                INNER JOIN "Step" "s" ON "s"."actorId" = "e"."employeeId"
                WHERE "s"."stepId" = ${result[0].previousStepId};`
          ;
          await this.writeFileStatus(employeeStep[0].name);
          await tx.request.update({
            data: { currentStepId: result[0].previousStepId },
            where: { requestId: result[0].requestId },
          });
        }
        await tx.step.update({
          data: { status: putStepDto.status, feedback: putStepDto.feedback },
          where: { stepId: result[0].stepId },
        });
        return true;
      } catch (error) {
        Logger.error(error);
        return false;
      }
    });
  }

  async writeFileStatus(username: string): Promise<void> {
    try {
      let file = fs.readFileSync(join(process.cwd() + '/input/test.mnd'), 'utf8');
      Logger.log(file);
      file = file.replace(':::success', '');
      file = file.replace(`[${username}]`, `[${username}]:::success`);
      fs.writeFileSync(join(process.cwd() + '/input/test.mnd'), file);
      await run(
        join(process.cwd() + '/input/test.mnd'),
        'output.svg');
    } catch (error) {
      Logger.error(error);
    }
  }

  async writeNewMndFile(stepsInput: CreateStepDto): Promise<boolean> {
    try {
      let actorIdStepNumber: Map<number, number> = new Map();
      const steps = stepsInput.steps;
      const mapWords: Map<number, string> = new Map([[1, 'A'], [2, 'B'], [3, 'C'], [4, 'D'], [5, 'E']]);
      let mapUserIdWords: Map<number, string> = new Map();
      let countWord = 1;
      let result: string[] = [];
      result.push(`%% ${stepsInput.requestId}`);
      result.push(`flowchart TD`);
      actorIdStepNumber.set(parseInt(steps[0].actor.split('-')[0]), 0);
      for (let i = 0; i < steps.length; i++) {
        const stepReject = actorIdStepNumber.get(parseInt(steps[i]?.reject?.split('-')[0]));
        actorIdStepNumber.set(
          parseInt(steps[i]?.actor.split('-')[0]),
          actorIdStepNumber.get(stepReject) ?? 1);
        if (i == 0) {
          actorIdStepNumber.set(parseInt(steps[0].actor.split('-')[0]), 0);
          result.push(`%% ${parseInt(steps[i].actor.split('-')[0])}-${actorIdStepNumber.get(parseInt(steps[0].actor.split('-')[0]))}`);
          result.push(...this.firstStep(steps[i], countWord, mapWords, mapUserIdWords).result);
          mapUserIdWords = this.firstStep(steps[i], countWord, mapWords, mapUserIdWords).map;

        } else if (i == steps.length - 1) {
          result.push(`%% ${parseInt(steps[i].actor.split('-')[0])}-${actorIdStepNumber.get(parseInt(steps[i].actor.split('-')[0]))}`);
          result.push(...this.lastStep(steps[i], countWord, mapWords, mapUserIdWords).result);
          mapUserIdWords = this.lastStep(steps[i], countWord, mapWords, mapUserIdWords).map;

        } else {
          result.push(`%% ${parseInt(steps[i].actor.split('-')[0])}-${actorIdStepNumber.get(parseInt(steps[i].actor.split('-')[0]))}`);
          result.push(...this.middleStep(steps[i], countWord, mapWords, mapUserIdWords).result);
          mapUserIdWords = this.middleStep(steps[i], countWord, mapWords, mapUserIdWords).map;
        }
        countWord += 1;
      }
      result.push(`    classDef success stroke:#0f0`);
      fs.writeFileSync(join(process.cwd() + '/input/test.mnd'), result.join('\n'));
      await run(
        join(process.cwd() + '/input/test.mnd'),
        'output.svg');
      return await this.requestService.parseFileContentMnd(result);
    } catch (error) {
      Logger.error(error);
    }
  }

  firstStep(step: Step, currentCountWord: number, mapWords: Map<number, string>, mapUserIdWords: Map<number, string>): {
    result: string[],
    map: Map<number, string>
  } {
    let result = [];
    result.push(`${mapWords.get(currentCountWord)}[${step.actor.split('-')[1]}]--> |Duyet chuong trinh|${mapWords.get(currentCountWord + 1)}[${step.accept.split('-')[1]}]:::success `);
    mapUserIdWords.set(parseInt(step.actor.split('-')[0]), mapWords.get(currentCountWord));
    mapUserIdWords.set(parseInt(step.accept?.split('-')[0]), mapWords.get(currentCountWord + 1));
    return { result, map: mapUserIdWords };
  }

  lastStep(step: Step, currentCountWord: number, mapWords: Map<number, string>, mapUserIdWords: Map<number, string>): {
    result: string[],
    map: Map<number, string>
  } {
    mapUserIdWords.set(parseInt(step.actor.split('-')[0]), mapWords.get(currentCountWord));
    mapUserIdWords.set(parseInt(step.accept?.split('-')[0]), mapWords.get(currentCountWord + 1));
    let result: string[] = [];
    result.push(`${mapWords.get(currentCountWord)} -->|accept|${mapWords.get(currentCountWord + 1)}[completed]`);
    result.push(`${mapWords.get(currentCountWord)} -->|reject|${mapUserIdWords.get(parseInt(step.reject?.split('-')[0]))}`);
    return { result, map: mapUserIdWords };
  }

  middleStep(step: Step, currentCountWord: number, mapWords: Map<number, string>, mapUserIdWords: Map<number, string>): {
    result: string[],
    map: Map<number, string>
  } {
    let result: string[] = [];
    mapUserIdWords.set(parseInt(step.actor.split('-')[0]), mapWords.get(currentCountWord));
    mapUserIdWords.set(parseInt(step.accept?.split('-')[0]), mapWords.get(currentCountWord + 1));
    result.push(`${mapWords.get(currentCountWord)} -->|accept|${mapWords.get(currentCountWord + 1)}[${step.accept?.split('-')[1]}]`);
    result.push(`${mapWords.get(currentCountWord)} -->|reject|${mapUserIdWords.get(parseInt(step.reject?.split('-')[0]))}`);
    return { result, map: mapUserIdWords };
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

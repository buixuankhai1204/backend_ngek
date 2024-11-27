import { RequestEntity } from '../../request/entities/request.entity';
import { EmployeeEntity } from '../../employee/entities/employee.entity';
import { Step } from '@prisma/client';
import { IntersectionType } from '@nestjs/mapped-types';

export class StepEntity implements Step {
  stepId: number;

  previousStepId: number;

  actorId: number;

  status: string;

  feedback: string;

  requestId: number;

  createdAt: Date;

  updatedAt: Date;
}

export class RequestStep extends IntersectionType(
  RequestEntity, StepEntity,
) {
}

export class EmployeeStep extends IntersectionType(
  EmployeeEntity, StepEntity,
) {
}
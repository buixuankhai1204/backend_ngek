import { Request } from '@prisma/client';

export class RequestEntity implements Request {
  requestId: number;

  requestType: string;

  currentStatus: string;

  totalStep: number;

  currentStepId: number;

  content: string;

  ownerId: number;

  createdAt: Date;

  updatedAt: Date;
}

import { Step } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class StepEntity implements Step {
  @ApiProperty()
  stepId: number;

  @ApiProperty({ required: false })
  previousStepId: number;

  @ApiProperty()
  actorId: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  feedback: string;

  @ApiProperty()
  requestId: number;

  @ApiProperty({ required: false, default: Date.now() })
  createdAt: Date;

  @ApiProperty({ required: false, default: Date.now() })
  updatedAt: Date;
}

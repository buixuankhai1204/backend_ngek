import { Request } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RequestEntity implements Request {
  @ApiProperty()
  requestId: number;

  @ApiProperty()
  requestType: string;

  @ApiProperty({ required: false })
  currentStatus: string;

  @ApiProperty()
  totalStep: number;

  @ApiProperty({ required: false })
  currentStepId: number;

  @ApiProperty({ required: false })
  content: string;

  @ApiProperty({ required: false })
  ownerId: number;

  @ApiProperty({ required: false, default: Date.now() })
  createdAt: Date;


  @ApiProperty({ required: false, default: Date.now() })
  updatedAt: Date;
}

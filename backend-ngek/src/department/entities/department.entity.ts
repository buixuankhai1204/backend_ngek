import { Department } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class DepartmentEntity implements Department {
  @ApiProperty()
  departmentId: number;

  @ApiProperty()
  departmentName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ required: false, default: Date.now() })
  createdAt: Date;


  @ApiProperty({ required: false, default: Date.now() })
  updatedAt: Date;
}

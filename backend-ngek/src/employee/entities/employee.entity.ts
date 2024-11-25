import { Employee } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeEntity implements Employee {
  @ApiProperty()
  employeeId: number;

  @ApiProperty({ required: false })
  departmentId: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, default: Date.now() })
  createdAt: Date;


  @ApiProperty({ required: false, default: Date.now() })
  updatedAt: Date;
}

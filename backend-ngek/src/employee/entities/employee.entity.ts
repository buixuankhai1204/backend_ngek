import { Employee } from '@prisma/client';

export class EmployeeEntity implements Employee {
  employeeId: number;
  departmentId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

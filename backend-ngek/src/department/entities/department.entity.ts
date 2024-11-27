import { Department } from '@prisma/client';

export class DepartmentEntity implements Department {
  departmentId: number;

  departmentName: string;

  description: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

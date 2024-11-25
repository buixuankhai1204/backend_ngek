import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  departmentId: number;
}

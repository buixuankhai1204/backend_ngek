import { IsNotEmpty, IsOptional} from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  departmentName: string;

  @IsOptional()
  description: string;

  @IsOptional()
  isActive: boolean;
}

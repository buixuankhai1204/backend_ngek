import { CreateDepartmentDto } from './create-department.dto.js';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}

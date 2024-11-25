import { IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @ApiProperty()
  departmentName: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description: string;

  @IsOptional()
  @ApiProperty({ required: false, default: true })
  isActive: boolean;
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeEntity } from './entities/employee.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { IResponse } from '../ultility/interfaceModel';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {
  }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<IResponse<EmployeeEntity>> {
    try {
      const res = await this.employeeService.create(createEmployeeDto);
      if (res) {
        return {
          statusCode: 200,
          message: 'Department created successfully',
          total: 1,
          data: [res],
        };
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'Can not create new  employee',
        }, HttpStatus.FORBIDDEN, {
          cause: 'error',
        });
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not create new  employee',
      }, HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  @Get()
  findAll(): Promise<EmployeeEntity[]> {
    try {
      return this.employeeService.findAll();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not get all employees',
      }, HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.employeeService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
  //   return this.employeeService.update(+id, updateEmployeeDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeeService.remove(+id);
  // }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { DepartmentService } from './department.service.js';
import { CreateDepartmentDto } from './dto/create-department.dto.js';
import { UpdateDepartmentDto } from './dto/update-department.dto.js';
import { DepartmentEntity } from './entities/department.entity';
import { IResponse } from '../ultility/interfaceModel';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {
  }

  @Post('/')
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<IResponse<DepartmentEntity>> {
    try {
      Logger.log(createDepartmentDto);
      const data = await this.departmentService.create(createDepartmentDto);
      if (data) {
        return {
          statusCode: 200,
          message: 'Department created successfully',
          total: 1,
          data: [data],
        };
      }
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not create new department',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Inert new item fail!',
      });
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not create new department',
      }, HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  @Get()
  findAll(): Promise<DepartmentEntity[]> {
    try {
      return this.departmentService.findAll();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Can not get all department',
      }, HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //     return this.departmentService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
  //     return this.departmentService.update(+id, updateDepartmentDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //     return this.departmentService.remove(+id);
  // }
}

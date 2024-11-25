import { Injectable, Logger } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeEntity } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const employee = await tx.employee.create({ data: createEmployeeDto });
        return employee;
      } catch (error) {
        Logger.error(error.message);
        return undefined;
      }
    });
  }

  async findAll(): Promise<EmployeeEntity[]> {
    try {
      await this.prisma.$transaction(async (tx) => {
        return tx.employee.findMany();
      });
    } catch (error) {
      Logger.error(error.message);
      return undefined;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}

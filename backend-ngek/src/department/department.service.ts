import { Injectable, Logger } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DepartmentEntity } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const a = await tx.department.create({ data: createDepartmentDto });
        Logger.error(a);
        return a;
      } catch (err) {
        Logger.error(err);
        return undefined;
      }
    });
  }

  async findAll(): Promise<DepartmentEntity[]> {
    return this.prisma.$transaction(async (tx) => {
      try {
        return tx.department.findMany({ where: { isActive: true } });
      } catch (error) {
        Logger.log(error);
        return undefined;
      }
    });
  }

  // findOne(id: number) {
  //     return `This action returns a #${id} department`;
  // }
  //
  // update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
  //     return `This action updates a #${id} department`;
  // }
  //
  // remove(id: number) {
  //     return `This action removes a #${id} department`;
  // }
}

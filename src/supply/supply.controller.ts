import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { IResponse } from '../ultility/interfaceModel';
import { Supply } from './schemas/supply.schema';
import { Types } from 'mongoose';

@Controller('supply')
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {
  }

  @Post()
  create(@Body() createSupplyDto: CreateSupplyDto[]): Promise<IResponse<Supply>> {
    return this.supplyService.create(createSupplyDto);
  }

  @Get()
  findAll(): Promise<IResponse<Supply>> {
    return this.supplyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<Supply>> {
    return this.supplyService.findOne(new Types.ObjectId(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplyDto: UpdateSupplyDto): Promise<IResponse<Supply>> {
    return this.supplyService.updateOne(new Types.ObjectId(id), updateSupplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<Supply>> {
    return this.supplyService.remove(new Types.ObjectId(id));
  }
}

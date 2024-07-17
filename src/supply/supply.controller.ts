import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { FindOneParams, IResponse } from '../ultility/interfaceModel';
import { Supply } from './schemas/supply.schema';
import { Types } from 'mongoose';
import {
  Filtering,
  FilteringParams,
  Pagination,
  PaginationParams,
  Sorting,
  SortingParams,
} from '../decorators/baseService.decorator';
import { ESupply } from './entities/supply.entity';

@Controller('supply')
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {
  }

  @Post()
  create(@Body() createSupplyDto: CreateSupplyDto[]): Promise<IResponse<Supply>> {
    return this.supplyService.create(createSupplyDto);
  }

  @Get()
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams([ESupply.Name, ESupply.TotoalPrice, ESupply.CreatedAt, ESupply.UpdatedAt]) sort?: Sorting,
    @FilteringParams([ESupply.Name]) filter?: Filtering,
  ): Promise<IResponse<Supply>> {
    return this.supplyService.findAll(filter, sort, paginationParams);
  }

  @Get(':id')
  findOne(@Param('id') params: FindOneParams): Promise<IResponse<Supply>> {
    return this.supplyService.findOne(new Types.ObjectId(params.id));
  }

  @Patch(':id')
  update(@Param('id') id: FindOneParams, @Body() updateSupplyDto: UpdateSupplyDto): Promise<IResponse<Supply>> {
    return this.supplyService.updateOne(new Types.ObjectId(id.id), updateSupplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: FindOneParams): Promise<IResponse<Supply>> {
    return this.supplyService.remove(new Types.ObjectId(id.id));
  }
}

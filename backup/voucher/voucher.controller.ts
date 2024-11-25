import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { IResponse } from '../ultility/interfaceModel';
import { Voucher } from './schemas/voucher.schema';
import {
  Filtering,
  FilteringParams,
  Pagination,
  PaginationParams,
  Sorting,
  SortingParams,
} from '../decorators/baseService.decorator';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto[]):Promise<IResponse<Voucher>> {
    return this.voucherService.create(createVoucherDto);
  }

  @Get()
  findAll(
    @PaginationParams() pagination: Pagination,
    @SortingParams(['name', 'minPrice', 'maxPrice']) sort?: Sorting,
    @FilteringParams(['name']) filter?: Filtering
  ):Promise<IResponse<Voucher>> {
    return this.voucherService.findAll(filter, sort, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<IResponse<Voucher>> {
    return this.voucherService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto):Promise<IResponse<Voucher>> {
    return this.voucherService.updateOne(id, updateVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<IResponse<Voucher>> {
    return this.voucherService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { IResponse } from '../ultility/interfaceModel';
import { Voucher } from './schemas/voucher.schema';
import { Types } from 'mongoose';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto[]):Promise<IResponse<Voucher>> {
    return this.voucherService.create(createVoucherDto);
  }

  @Get()
  findAll():Promise<IResponse<Voucher>> {
    return this.voucherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<IResponse<Voucher>> {
    return this.voucherService.findOne(new Types.ObjectId(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto):Promise<IResponse<Voucher>> {
    return this.voucherService.updateOne(new Types.ObjectId(id), updateVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<IResponse<Voucher>> {
    return this.voucherService.remove(new Types.ObjectId(id));
  }
}

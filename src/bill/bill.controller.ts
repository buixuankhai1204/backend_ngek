import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillService } from './bill.service';
import { AddProductForBillDto, CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { IResponse } from '../ultility/interfaceModel';
import { Bill } from './schemas/bill.schema';
import { Types } from 'mongoose';
import { BillWithListProduct } from './entities/bill.entity';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {
  }

  @Post()
  create(@Body() createBillDto: CreateBillDto): Promise<IResponse<Bill>> {
    return this.billService.create(createBillDto);
  }

  @Get()
  findAll(): Promise<IResponse<Bill>> {
    return this.billService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<BillWithListProduct>> {
    return this.billService.findOneCustom(new Types.ObjectId(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto): Promise<IResponse<Bill>> {
    return this.billService.update(new Types.ObjectId(id), updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<Bill>> {
    return this.billService.remove(new Types.ObjectId(id));
  }

  @Delete(':billId')
  deleteProductInBill(@Param('billId') billId: string, @Body('productId') productId: string): Promise<IResponse<void>> {
    return this.billService.deleteProductInBill(new Types.ObjectId(billId), new Types.ObjectId(productId));
  }

  @Patch(':billId')
  updateProductInBill(@Body('billId') billId: string,
                      @Body('products') productInBillDto: AddProductForBillDto[]): Promise<IResponse<void>> {
    return this.billService.updateProductInBill(new Types.ObjectId(billId), productInBillDto);
  }
}

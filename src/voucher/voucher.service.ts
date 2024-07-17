import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Model } from 'mongoose';
import { Service } from '../decorators/baseService.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Voucher } from './schemas/voucher.schema';

@Injectable()
export class VoucherService extends Service<Voucher, CreateVoucherDto, UpdateVoucherDto> {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<Voucher>) {
    super(voucherModel);
  }


}

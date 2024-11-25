import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Service } from '../decorators/baseService.decorator';
import { Voucher } from './schemas/voucher.schema';

@Injectable()
export class VoucherService extends Service<Voucher, CreateVoucherDto, UpdateVoucherDto> {
}

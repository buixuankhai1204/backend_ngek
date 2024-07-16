import { Injectable } from '@nestjs/common';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { Service } from '../decorators/baseService.decorator';
import { Supply } from './schemas/supply.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise, Types } from 'mongoose';
import { IResponse } from '../ultility/interfaceModel';

@Injectable()
export class SupplyService extends Service<Supply, CreateSupplyDto, UpdateSupplyDto> {
  constructor(
    @InjectModel(Supply.name) private SupplyModel: Model<Supply>,
  ) {
    super(SupplyModel);
  }

  findOneCustom(id: Types.ObjectId): Promise<IResponse<unknown>> {
    return Promise.resolve(undefined);
  }
}

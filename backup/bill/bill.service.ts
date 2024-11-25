import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { IResponse } from '../ultility/interfaceModel';
import { Bill } from './schemas/bill.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Supply } from '../supply/schemas/supply.schema';
import { Service } from '../decorators/baseService.decorator';
import { ProductQuantity } from '../product/schemas/product.schema';
import { ProductBill } from '../product-bill/schemas/product-bill.schema';

@Injectable()
export class BillService extends Service<Bill, CreateBillDto, UpdateBillDto> {
  constructor(
    @InjectModel(Bill.name) private billModel: Model<Bill>,
    @InjectModel(Supply.name) private supplyModel: Model<Supply>,
    @InjectModel(ProductBill.name) private productBillModel: Model<ProductBill>,
    @InjectModel(ProductQuantity.name) private productQuantityModel: Model<ProductQuantity>,
  ) {
    super(billModel);
  }

  async create(createBillDto: CreateBillDto[]): Promise<IResponse<Bill>> {
    console.log(createBillDto[0].supplyId)
    const supply: Supply = await this.supplyModel.findOne({ _id: new Types.ObjectId(createBillDto[0].supplyId), isActive: true });
    if (!supply) {
      throw new BadRequestException('Can not find supplier by this id');
    }

    const bill: Bill[] = await this.billModel.create(createBillDto);
    if (!bill.length) {
      throw new BadRequestException('Can not create new bill');
    }

    return {
      statusCode: 200,
      message: 'create new bill success',
      total: bill.length,
      data: bill,
    };
  }


  async update(id: Types.ObjectId, updateBillDto: UpdateBillDto): Promise<IResponse<Bill>> {
    const supply: Supply = await this.supplyModel.findOne({ _id: updateBillDto.supplyId, status });
    if (!supply) {
      throw new BadRequestException('Can not find supplier by this id');
    }

    const bill: Bill = await this.billModel.findByIdAndUpdate(id, updateBillDto);
    if (!bill) {
      throw new BadRequestException('Can not create new bill');
    }

    return {
      statusCode: 200,
      message: 'Create new bill success',
      total: 0,
      data: [],
    };
  }

  async deleteProductInBill(billId: Types.ObjectId, productId: Types.ObjectId): Promise<IResponse<void>> {
    await this.productBillModel.deleteOne({ billId: billId, productId: productId });

    return {
      statusCode: 200,
      message: 'Delete product bill success',
      total: 0,
      data: [],
    };
  }
}

import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VoucherDocument = HydratedDocument<Voucher>;

export enum ETypeVoucher {
  Voucher = 'Voucher',
  coupon = "Coupon"
}

@Schema()
export class Voucher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: ETypeVoucher;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  quantity: string;
}


export const VoucherSchema = SchemaFactory.createForClass(Voucher);

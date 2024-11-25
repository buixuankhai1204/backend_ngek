import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export enum ETypeVoucher {
  Voucher = 'Voucher',
  coupon = 'Coupon'
}

@Schema()
export class Voucher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: ETypeVoucher.Voucher })
  type: ETypeVoucher;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  quantity: string;

  @Prop({ default: true })
  isActive: boolean;
}


export const VoucherSchema = SchemaFactory.createForClass(Voucher);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export enum EStatusdelivery {
  Cancel = 'Cancel',
  Completed = 'Completed',
  Delivering = 'Delivering',
  Return = 'Return',
}

@Schema()
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  statusDelivery: EStatusdelivery;

  @Prop()
  note: string;

  @Prop({ required: false, default: true })
  isActive: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

@Schema()
export class OrderVoucher {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  orderId: Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  voucherId: Types.ObjectId;

  @Prop({ required: true })
  totalPriceDown: number;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

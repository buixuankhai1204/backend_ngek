import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema()
export class Bill {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Supply" })
  supplyId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  isPay: boolean;

  @Prop({ required: true })
  isDelivered: boolean;

  @Prop({ required: false })
  note: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const BillSchema = SchemaFactory.createForClass(Bill);


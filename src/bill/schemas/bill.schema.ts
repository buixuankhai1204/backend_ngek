import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uniqueValidator = require('mongoose-unique-validator');
@Schema()
export class Bill {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Supply" })
  supplyId: Types.ObjectId;

  @Prop({ required: true, unique: true })
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
BillSchema.plugin(uniqueValidator, {
  message: 'Product Image unique id must be unique.',
});

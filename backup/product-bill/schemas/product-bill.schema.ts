import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { ETypeSize } from '../../product/schemas/product.schema';

@Schema()
export class ProductBill {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Product" })
  productId: Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Bill" })
  billId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  size: ETypeSize;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const ProductBillSchema = SchemaFactory.createForClass(ProductBill);
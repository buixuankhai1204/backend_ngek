import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema()
export class ProductOrder {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  productId: Types.ObjectId;

  @Prop({ required: true })
  orderId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const ProductOrderSchema = SchemaFactory.createForClass(ProductOrder);
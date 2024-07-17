import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class ProductVoucher {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Voucher' })
  voucherId: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const ProductVoucherSchema = SchemaFactory.createForClass(ProductVoucher);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class ProductImage {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  isMain: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);

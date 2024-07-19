import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BadRequestException } from '@nestjs/common';


// eslint-disable-next-line @typescript-eslint/no-var-requires
const uniqueValidator = require('mongoose-unique-validator');

@Schema()
export class ProductImage {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: string;

  @Prop({ required: true, unique: true })
  imageUrl: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}


export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);
ProductImageSchema.plugin(uniqueValidator, {
  message: 'Product Image unique id must be unique.',
});
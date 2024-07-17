import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum ETypeSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  CupA = 'CupA',
  CupB = 'CupB',
  CupC = 'CupC',
  Size28 = '28',
  Size29 = '29',
  Size30 = '30',
  Size31 = '31',
  Size32 = '32',
}

@Schema()
export class Product {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  categoryId: string;

  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  minPrice: number;

  @Prop({ required: true })
  maxPrice: number;

  @Prop({ default: 0 })
  isActive: number;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const ProductSchema =
  SchemaFactory.createForClass(Product);



@Schema()
export class ProductQuantity {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  productId: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  size: ETypeSize;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const ProductQuantitySchema =
  SchemaFactory.createForClass(ProductQuantity);


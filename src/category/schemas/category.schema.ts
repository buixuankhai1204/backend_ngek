import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({
    unique: true,
    required: true,
    length: {
      min: 5,
      max: 50,
    },
  })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId })
  parentCategoryId: Types.ObjectId;

  @Prop({
    length: {
      min: 5,
      max: 500,
    },
    unique: true,
    required: true,
  })
  description?: string;

  @Prop({ default: 1, required: false })
  isActive: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

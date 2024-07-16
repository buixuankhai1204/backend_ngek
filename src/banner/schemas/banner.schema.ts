import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BannerDocument = HydratedDocument<Banner>;

@Schema()
export class Banner {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  categoryId: Types.ObjectId;

  @Prop({ required: true })
  imageUrl: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Supply {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  ownerName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, unique: true })
  bankAccount: number;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: false, default: true })
  isActive: boolean;

  @Prop({ required: false })
  note: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const SupplySchema = SchemaFactory.createForClass(Supply);

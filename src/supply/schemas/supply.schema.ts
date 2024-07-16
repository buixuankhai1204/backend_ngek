import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Supply {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  bankAccount: number;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const SupplySchema = SchemaFactory.createForClass(Supply);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export enum ERole {
  Admin = 'admin',
  User = 'user',
}

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false, default: ERole.User })
  role: ERole;
}

@Schema()
export class Address {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  isDefault: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  age: number;

  @Prop({ required: false, default: 'user' })
  role: Role;
}

enum Role {
  user = 'User',
  admin = 'Admin',
}
export const UserSchema = SchemaFactory.createForClass(User);

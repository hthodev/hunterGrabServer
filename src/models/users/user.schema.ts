import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop({ enum: ['Male', 'Female'] })
  gender: 'Male' | 'Female';

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop({ default: 'https://i.imgur.com/A4rs3bu.png' })
  image: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: ['GUEST'] })
  positions: string[];

  @Prop({ default: false })
  isBanned: boolean;

  @Prop()
  ipAllowed: string[];

  @Prop({ enum: ['Google', 'Account'], default: 'Account' })
  method: 'Google' | 'Account';

  @Prop({ default: 0})
  views: number;

  @Prop({ default: 0})
  follows: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

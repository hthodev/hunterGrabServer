import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({
    enum: ['Potential', 'Confirmed', 'Listed', 'Distributed', 'Verification'],
  })
  status: 'Potential' | 'Confirmed' | 'Listed' | 'Distributed' | 'Verification';

  @Prop({ required: true })
  symbol: string;

  @Prop()
  raise: number;

  @Prop()
  logo: string;

  @Prop()
  numberSuffixes: string;

  @Prop()
  investments: {
    slug: string;
    name: string;
    logo: string;
    tier: number;
    isLead: boolean;
  }[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  authorId: Types.ObjectId;

  @Prop({ default: 0})
  views: number;

  @Prop({ default: 0})
  follows: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

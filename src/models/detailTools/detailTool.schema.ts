import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tool } from '../tools/tool.schema';

export type DetailToolDocument = DetailTool & Document;

@Schema({ timestamps: true })
export class DetailTool {
  @Prop({ required: true })
  title: string;

  @Prop()
  minRam: string;

  @Prop()
  banner: string;

  @Prop()
  minCore: string;

  @Prop()
  describeVie: string;

  @Prop()
  describeVieHTML: string;

  @Prop()
  describeEng: string;

  @Prop()
  describeEngHTML: string;

  @Prop()
  author: string;

  @Prop()
  language: string;

  @Prop()
  isMultiple: boolean;

  @Prop({ type: Types.ObjectId, ref: Tool.name, required: true })
  toolId: Types.ObjectId;

  @Prop({ require: true, unique: true })
  slug: string
}

export const DetailToolSchema = SchemaFactory.createForClass(DetailTool);

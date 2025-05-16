import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tool } from '../tools/tool.schema';

export type ToolViewDocument = ToolView & Document;

@Schema({ timestamps: true })
export class ToolView {
  @Prop()
  dateView: Date;

  @Prop()
  dateFollow: Date;

  @Prop({ type: Types.ObjectId, ref: Tool.name, required: true })
  toolId: Types.ObjectId;

  @Prop({ default: 0 })
  views: number;
}

export const ToolViewSchema = SchemaFactory.createForClass(ToolView);

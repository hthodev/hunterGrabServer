import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from '../projects/project.schema';

export type ToolDocument = Tool & Document;

@Schema({ timestamps: true })
export class Tool {
  @Prop({ required: true, unique: true })
  slug: string
  
  @Prop()
  raise: string;

  @Prop({ enum: ["Working", "No working"], default: "Working" })
  toolStatus: "Working" | "No working"

  @Prop()
  note: string;

  @Prop()
  github: string;

  @Prop()
  linkTool: string;

  @Prop()
  version: string

  @Prop()
  icon: string

  @Prop({ required: true })
  language: string

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  projectId: Types.ObjectId
}

export const ToolSchema = SchemaFactory.createForClass(Tool);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from '../projects/project.schema';

export type ProjectViewDocument = ProjectView & Document;

@Schema({ timestamps: true })
export class ProjectView {
  @Prop()
  dateView: Date;

  @Prop()
  dateFollow: Date;

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  projectId: Types.ObjectId;

  @Prop({ default: 0 })
  views: number;
}

export const ProjectViewSchema = SchemaFactory.createForClass(ProjectView);

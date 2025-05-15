import { Expose, Type } from 'class-transformer';
import { IsString, IsEnum } from 'class-validator';
import { ProjectDto } from '../projects/project.dto'
import { Types } from 'mongoose';


export class ToolDto {
  @Expose()
  readonly _id: Types.ObjectId;
}

import { Expose, Type } from 'class-transformer';
import { IsString, IsEnum } from 'class-validator';
import { ProjectDto } from '../projects/project.dto'
import { Types } from 'mongoose';


export class ToolDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  @IsString()
  readonly slug: string;

  @Expose()
  @IsString()
  readonly raise: string;

  @Expose()
  @IsEnum(["Working", "No working"])
  readonly toolStatus: "Working" | "No working";

  @Expose()
  @IsString()
  readonly note: string;

  @Expose()
  @IsString()
  readonly github: string;

  @Expose()
  @IsString()
  readonly linkTool: string;

  @Expose()
  @IsString()
  readonly version: string;

  @Expose()
  @IsString()
  readonly icon: string;

  @Expose()
  @IsString()
  readonly language: string;

  @Expose({ name: 'project' }) 
  @Type(() => ProjectDto)
  readonly projectId: ProjectDto;
}

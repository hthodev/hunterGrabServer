import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tool, ToolDocument } from './tool.schema';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../projects/project.schema';
import { plainToInstance } from 'class-transformer';
import { ToolDto } from './tool.dto';

@Injectable()
export class ToolService {
  constructor(@InjectModel(Tool.name) private toolModel: Model<ToolDocument>) {}

  @InjectModel(Project.name)
  private projectModel: Model<ProjectDocument>;

  async create(body): Promise<Tool> {
    const findProject = await this.projectModel.findById(body.projectId);
    if (!findProject) return;
    const create = new this.toolModel(body);
    return create.save();
  }

  async findAll(): Promise<any[]> {
    const tools = await this.toolModel.find().populate('projectId').lean();
    return tools.map((tool) => {
      const { projectId, ...rest } = tool;
      return {
        ...rest,
        project: projectId,
      };
    });
  }
}

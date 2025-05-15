import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';
import { Tool, ToolDocument } from '../tools/tool.schema';
import { Types } from 'mongoose';
import { stringId } from 'src/shares/ultis';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}
  @InjectModel(Tool.name)
  private toolModel: Model<ToolDocument>;

  async create(body): Promise<Project> {
    const createdUser = new this.projectModel({
      ...body,
      projectId: new Types.ObjectId(body.projectId),
    });
    return createdUser.save();
  }

  async findAll(): Promise<any> {
    const projects = await this.projectModel.find().lean().exec();
    const projectIds = projects.map((project: ProjectDocument) => project._id);
    const tools = await this.toolModel
      .find({
        projectId: { $in: projectIds },
      })
      .select('slug toolStatus projectId')
      .lean();

    return projects.map((project: ProjectDocument) => ({
      ...project,
      tool: tools.find(
        (tool: ToolDocument) => stringId(tool.projectId) == project._id,
      ),
    }));
  }
}

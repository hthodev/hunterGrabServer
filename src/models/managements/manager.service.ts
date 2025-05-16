import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { stringId } from 'src/shares/ultis';
import { Tool, ToolDocument } from '../tools/tool.schema';
import { Project, ProjectDocument } from '../projects/project.schema';

@Injectable()
export class ManagementService {
  constructor() {}
  @InjectModel(Project.name)
  private projectModel: Model<ProjectDocument>;

  @InjectModel(Tool.name)
  private toolModel: Model<ToolDocument>;

  async list(): Promise<any> {
    const projects = await this.projectModel
      .find()
      .populate('authorId', 'username email firstName lastName image score')
      .lean()
      .exec();
    const projectIds = projects.map((project) => project._id);
    const tools = await this.toolModel
      .find({
        projectId: { $in: projectIds },
      })
      .select('slug toolStatus projectId')
      .lean();

    return projects.map((project) => {
      const author = project.authorId;
      delete project.authorId;
      return {
        ...project,
        author,
        tool: tools.find(
          (tool: ToolDocument) => stringId(tool.projectId) == project._id,
        ),
      };
    });
  }
}

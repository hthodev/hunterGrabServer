import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';
import { Tool, ToolDocument } from '../tools/tool.schema';
import { Types } from 'mongoose';
import { stringId } from 'src/shares/ultis';
import {
  ProjectView,
  ProjectViewDocument,
} from '../projectViewByTime/projectView.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}
  @InjectModel(Tool.name)
  private toolModel: Model<ToolDocument>;

  @InjectModel(ProjectView.name)
  private projectViewModel: Model<ProjectViewDocument>;

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

  async projectViewer(type: 'date' | 'month' | 'year') {
    let startTime;
    let endTime;
    const today = new Date();

    const getDaysInMonth = (year: number, month: number): number => {
      return new Date(year, month, 0).getDate();
    };

    switch (type) {
      case 'date':
        startTime = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}T00:00:00Z`;
        endTime = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}T23:59:59Z`;
        break;
      case 'month':
        startTime = `01-${today.getMonth() + 1}-${today.getFullYear()}T00:00:00Z`;
        endTime = `${getDaysInMonth(today.getFullYear(), today.getMonth() + 1)}-${today.getMonth() + 1}-${today.getFullYear()}T23:59:59Z`;
        break;
      case 'year':
        startTime = `01-01-${today.getFullYear()}T00:00:00Z`;
        endTime = `31-12-${today.getFullYear()}T23:59:59Z`;
        break;
    }

    const views = await this.projectViewModel.aggregate([
      {
        $match: {
          timestamp: { $gte: startTime, $lte: endTime },
        },
      },
    ]);

    let viewer = 0;

    console.log('views', views);
    if (!views.length) {
      return { viewer }
    };

    views.forEach(view => {
      viewer += view.views
    })
    return { viewer }
  }
}

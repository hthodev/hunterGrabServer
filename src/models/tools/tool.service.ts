import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tool, ToolDocument } from './tool.schema';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../projects/project.schema';
import { plainToInstance } from 'class-transformer';
import { ToolDto } from './tool.dto';
import { ToolView, ToolViewDocument } from '../toolViewByTime/toolView.schema';

@Injectable()
export class ToolService {
  constructor(@InjectModel(Tool.name) private toolModel: Model<ToolDocument>) {}

  @InjectModel(Project.name)
  private projectModel: Model<ProjectDocument>;

  @InjectModel(ToolView.name)
  private toolViewModel: Model<ToolViewDocument>;

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

  async toolViewer(type: 'date' | 'month' | 'year') {
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

    const views = await this.toolViewModel.aggregate([
      {
        $match: {
          timestamp: { $gte: startTime, $lte: endTime },
        },
      },
    ]);

    console.log("views", views);
    
  }
}

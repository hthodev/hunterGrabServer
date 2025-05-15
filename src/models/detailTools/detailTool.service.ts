import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DetailTool, DetailToolDocument } from './detailTool.schema';
import { Model } from 'mongoose';
import { Tool, ToolDocument } from '../tools/tool.schema';

@Injectable()
export class DetailToolService {
  constructor(
    @InjectModel(DetailTool.name)
    private detailToolModel: Model<DetailToolDocument>,

    @InjectModel(Tool.name)
    private toolModel: Model<ToolDocument>,
  ) {}

  async detailBySlug(slug: string): Promise<DetailTool | null> {
    const findSlug = await this.toolModel.findOne({ slug });
    if (!findSlug) return;

    const detail = await this.detailToolModel.findOne({ slug })
    if (!detail) return;


    return detail;
  }
}

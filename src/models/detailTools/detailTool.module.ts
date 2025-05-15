import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DetailTool, DetailToolSchema } from './detailTool.schema';
import { DetailToolService } from './detailTool.service';
import { DetailToolController } from './detailTool.controller';
import { Tool, ToolSchema } from '../tools/tool.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DetailTool.name, schema: DetailToolSchema },
      { name: Tool.name, schema: ToolSchema },
    ]),
  ],
  providers: [DetailToolService],
  controllers: [DetailToolController],
  exports: [DetailToolService],
})
export class DetailToolModule {}

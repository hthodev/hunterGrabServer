import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tool, ToolSchema } from './tool.schema';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { Project, ProjectSchema } from '../projects/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tool.name, schema: ToolSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  providers: [ToolService],
  controllers: [ToolController],
  exports: [ToolService],
})
export class ToolModule {}

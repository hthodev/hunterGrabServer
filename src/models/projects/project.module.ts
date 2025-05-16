import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ToolModule } from '../tools/tool.module';
import { Tool } from '../tools/tool.schema';
import { ProjectView, ProjectViewSchema } from '../projectViewByTime/projectView.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Tool.name, schema: ToolModule },
      { name: ProjectView.name, schema: ProjectViewSchema },
    ]),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}

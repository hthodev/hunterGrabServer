import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ToolModule } from '../tools/tool.module';
import { Tool } from '../tools/tool.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Tool.name, schema: ToolModule },
    ]),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagementService } from './manager.service';
import { ManagementController } from './manager.controller';
import { Tool, ToolSchema } from '../tools/tool.schema';
import { Project, ProjectSchema } from '../projects/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Tool.name, schema: ToolSchema },
    ]),
  ],
  providers: [ManagementService],
  controllers: [ManagementController],
  exports: [ManagementService],
})
export class ManagementModule {}

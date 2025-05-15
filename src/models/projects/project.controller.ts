import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';
import { responseEndpoint } from 'src/responses/endpoint';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/add')
  async create(@Body() body) {
    return responseEndpoint({ data: await this.projectService.create(body) })
  }

  @Get("/list")
  async findAll() {
    return responseEndpoint({ data: await this.projectService.findAll() })
  }
}

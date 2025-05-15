import { Controller, Get, Post, Body } from '@nestjs/common';
import { ToolService } from './tool.service';
import { responseEndpoint } from 'src/responses/endpoint';

@Controller('tools')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Post('/add')
  async create(@Body() body) {
    return responseEndpoint({ data: await this.toolService.create(body)});
  }

  @Get("/list")
  async findAll() {
    return responseEndpoint({ data: await this.toolService.findAll() });
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { ManagementService } from './manager.service';
import { responseEndpoint } from 'src/responses/endpoint';

@Controller('managements')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @Get("/project-list")
  async list() {
    return responseEndpoint({ data: await this.managementService.list() })
  }
}

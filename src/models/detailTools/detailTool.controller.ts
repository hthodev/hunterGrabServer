import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DetailToolService } from './detailTool.service';
import { responseEndpoint } from 'src/responses/endpoint';

@Controller('detail-tools')
export class DetailToolController {
  constructor(private readonly detailToolService: DetailToolService) {}

  @Get('/:slug')
  async detailBySlug(@Param('slug') slug: string) {
    return responseEndpoint({ data: await this.detailToolService.detailBySlug(slug) })
  }
}

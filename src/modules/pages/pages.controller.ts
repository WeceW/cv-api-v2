import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto, Page } from './page.entity';
import { Public } from '../../decorators/Public';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('pages')
@Controller('pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @ApiResponse({ status: 200, type: Page, isArray: true })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @ApiResponse({ status: 200, type: Page })
  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.pagesService.findOneBy(slug);
  }

  @ApiBearerAuth()
  @Post()
  create(@Body() page: CreatePageDto) {
    return this.pagesService.create(page);
  }

  @ApiBearerAuth()
  @Delete(':slugOrId')
  delete(@Param('slugOrId') slugOrId: string | number) {
    return this.pagesService.delete(slugOrId);
  }
}

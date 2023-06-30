import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './page.entity';
import { Public } from 'src/decorators/Public';

@Controller('pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.pagesService.findOneBy(slug);
  }

  @Post()
  create(@Body() page: CreatePageDto) {
    return this.pagesService.create(page);
  }

  @Delete(':slugOrId')
  delete(@Param('slugOrId') slugOrId: string | number) {
    return this.pagesService.delete(slugOrId);
  }
}

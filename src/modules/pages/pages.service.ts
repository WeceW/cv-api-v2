import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { CreatePageDto, Page } from './page.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private pagesRepository: Repository<Page>,
  ) {}

  /**
   * Find all pages
   */
  findAll(): Promise<Page[]> {
    return this.pagesRepository.find();
  }

  /**
   * Find one page by slug
   */
  findOneBy(slug: string): Promise<Page | null> {
    return this.pagesRepository.findOneBy({ slug });
  }

  /**
   * Create a new page
   */
  async create(payload: CreatePageDto) {
    if (!payload.slug) {
      // Generate a slug based on the title
      payload.slug = slugify(payload.title, { lower: true });
    }

    const existingPage = await this.findOneBy(payload.slug);

    if (existingPage) {
      // Overwrite the existing page instead of creating a new one
      this.pagesRepository.update(existingPage.id, payload);
    }

    this.pagesRepository.save(payload);
  }

  /**
   * Delete a page
   */
  async delete(slugOrId: string | number) {
    console.log(slugOrId);
    if (typeof slugOrId === 'number') {
      return this.pagesRepository.delete(slugOrId);
    }

    const page = await this.findOneBy(slugOrId);

    if (!page) return null;

    return this.pagesRepository.delete(page.id);
  }
}

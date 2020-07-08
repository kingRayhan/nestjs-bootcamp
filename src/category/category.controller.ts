import {
  Controller,
  Get,
  Query,
  Param,
  Put,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { DocumentType } from '@typegoose/typegoose';
import { ResoucePagination, ResourceList } from 'src/shared/types';
import { Category } from './category.type';
import { UpdateCategoryInput, CreateCategoryInput } from './category.input';
import { ApiTags } from '@nestjs/swagger';
import { ApiPagination } from 'src/utils/ApiPagination.decorator';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiPagination()
  async index(
    @Query() query: ResoucePagination,
  ): Promise<ResourceList<Category>> {
    return this.categoryService.indexService(query);
  }

  @Get(':_id')
  async show(@Param('_id') _id: string): Promise<DocumentType<Category>> {
    return this.categoryService.showService(_id);
  }

  @Post()
  async create(
    @Body() body: CreateCategoryInput,
  ): Promise<DocumentType<Category>> {
    return await this.categoryService.storeService(body);
  }

  @Put(':_id')
  update(
    @Param('_id') _id: string,
    @Body() body: UpdateCategoryInput,
  ): Promise<DocumentType<Category>> {
    return this.categoryService.updateService(_id, body);
  }

  @Delete(':_id')
  destroy(@Param('_id') _id: string): Promise<DocumentType<Category>> {
    return this.categoryService.destroyService(_id);
  }
}

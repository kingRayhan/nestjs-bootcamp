import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from './category.type';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { index, store, show, destroy, update } from 'quick-crud';
import { ResoucePagination, ResourceList } from 'src/shared/types';
import { CreateCategoryInput, UpdateCategoryInput } from './category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly model: ReturnModelType<typeof Category>,
  ) {}

  indexService(query: ResoucePagination): Promise<ResourceList<Category>> {
    return index({
      model: this.model,
      paginationOptions: query,
    });
  }

  async storeService(
    data: CreateCategoryInput,
  ): Promise<DocumentType<Category>> {
    return store({
      model: this.model,
      data,
    });
  }

  async showService(_id: string): Promise<DocumentType<Category>> {
    return show({
      model: this.model,
      where: { _id },
      populateOptions: {
        path: 'products',
        select: '-categories title description price',
      },
    });
  }

  async updateService(
    _id: string,
    data: UpdateCategoryInput,
  ): Promise<DocumentType<Category>> {
    return update({
      model: this.model,
      where: { _id },
      data,
    });
  }

  async destroyService(_id: string): Promise<DocumentType<Category>> {
    return destroy({
      model: this.model,
      where: { _id },
    });
  }
}

import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { Product } from './product.type';
import { CreateProductInput, UpdateProductInput } from './products.input';
import { InjectModel } from 'nestjs-typegoose';
import { index, destroy, store, update } from 'quick-crud';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { ResourceList, ResoucePagination } from 'src/shared/types';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly model: ReturnModelType<typeof Product>,
  ) {}

  async getProducts(
    pagination: ResoucePagination,
  ): Promise<ResourceList<DocumentType<Product>>> {
    return index({
      model: this.model,
      paginationOptions: pagination,
    });
  }

  createProduct(data: CreateProductInput): Promise<DocumentType<Product>> {
    return store({ model: this.model, data });
  }

  async updateProduct(
    _id: string,
    data: UpdateProductInput,
  ): Promise<DocumentType<Product>> {
    return update({ model: this.model, data, where: { _id } });
  }

  async getProductById(_id: string): Promise<DocumentType<Product>> {
    const product = await this.model.findById(_id);
    if (!product) throw new NotFoundException();

    return product;
  }

  async deleteProduct(_id: string): Promise<DocumentType<Product>> {
    const product = await this.getProductById(_id);
    if (!product) throw new NotFoundException();

    return destroy({ model: this.model, where: { _id } });
  }
}

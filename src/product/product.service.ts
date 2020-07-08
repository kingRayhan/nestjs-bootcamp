import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.type';
import { CreateProductInput, UpdateProductInput } from './products.input';
import { InjectModel } from 'nestjs-typegoose';
import { index, destroy } from 'quick-crud';
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
    if (pagination.limit) pagination.limit = +pagination.limit;
    if (pagination.page) pagination.limit = +pagination.page;

    return index({
      model: this.model,
      paginationOptions: pagination,
      // populateOptions: {
      //   path: 'categories',
      // },
    });
  }

  createProduct(data: CreateProductInput): Promise<DocumentType<Product>> {
    return this.model.create({
      ...data,
      categories: data.categories.map(c => Types.ObjectId(c)),
    });
  }

  async updateProduct(
    _id: string,
    updateData: UpdateProductInput,
  ): Promise<DocumentType<Product>> {
    return this.model.findOneAndUpdate(
      { _id },
      {
        ...updateData,
        categories: updateData.categories.map(c => Types.ObjectId(c)),
      },
      {
        new: true,
      },
    );
  }

  async getProductById(_id: string): Promise<DocumentType<Product>> {
    try {
      const product = await this.model.findById(_id);
      return product;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteProduct(_id: string): Promise<DocumentType<Product>> {
    try {
      return destroy({ model: this.model, where: { _id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}

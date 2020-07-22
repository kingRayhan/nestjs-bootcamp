import { Resolver, Query, Args } from '@nestjs/graphql';
import { Product, ProductPayload } from './product.type';
import { ProductService } from './product.service';
import { ResourceList, ResoucePagination } from 'src/shared/types';
import { DocumentType } from '@typegoose/typegoose';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductPayload)
  async products(
    @Args('pagination', { nullable: true }) pagination: ResoucePagination,
  ): Promise<ResourceList<Product>> {
    return this.productService.getProducts(pagination);
  }

  @Query(() => Product)
  async product(@Args('_id') _id: string): Promise<DocumentType<Product>> {
    return this.productService.getProductById(_id);
  }
}

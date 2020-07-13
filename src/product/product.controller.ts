import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.type';
import { CreateProductInput, UpdateProductInput } from './products.input';
import { DocumentType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { ResourceList, ResoucePagination } from 'src/shared/types';
import { ApiPagination } from 'src/utils/ApiPagination.decorator';
import { HandleInvalidObjectId } from 'src/utils/mongodb.filters';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiPagination()
  async index(
    @Query() query: ResoucePagination,
  ): Promise<ResourceList<DocumentType<Product>>> {
    return this.productService.getProducts(query);
  }

  @Get(':_id')
  async show(@Param('_id') productId: string): Promise<DocumentType<Product>> {
    return this.productService.getProductById(productId);
  }

  @Post()
  async store(
    @Body() data: CreateProductInput,
  ): Promise<DocumentType<Product>> {
    return this.productService.createProduct(data);
  }

  @Put(':_id')
  async update(
    @Body() data: UpdateProductInput,
    @Param('_id') _id: string,
  ): Promise<DocumentType<Product>> {
    return this.productService.updateProduct(_id, data);
  }

  @Delete('/:_id')
  async destroy(
    @Param('_id') productId: string,
  ): Promise<DocumentType<Product>> {
    return this.productService.deleteProduct(productId);
  }
}

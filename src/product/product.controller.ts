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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { CreateProductInput, UpdateProductInput } from './products.input';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  index(): Product[] {
    return this.productService.getProducts();
  }

  @Get(':_id')
  show(@Param('_id') productId: string): Product {
    return this.productService.getProductById(productId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  store(@Body() data: CreateProductInput): Product {
    return this.productService.createProduct(data);
  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  update(@Body() data: UpdateProductInput, @Param('_id') _id: string): Product {
    return this.productService.updateProduct(_id, data);
  }

  @Delete('/:_id')
  destroy(@Param('_id') productId: string): any {
    this.productService.deleteProduct(productId);

    return {
      message: `ProductId: ${productId} deleted successfully`,
    };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { CreateProductInput, UpdateProductInput } from './products.input';

@Injectable()
export class ProductService {
  products: Product[] = [];

  getProducts(): Product[] {
    return this.products;
  }

  createProduct(data: CreateProductInput): Product {
    const product = new Product(data.title, data.description, data.price);
    this.products.unshift(product);
    return product;
  }

  updateProduct(_id: string, updateData: UpdateProductInput): Product {
    const index = this.products.findIndex(p => p._id == _id);
    this.products[index].title = updateData.title;
    this.products[index].description = updateData.description;
    this.products[index].price = updateData.price;
    return this.products[index];
  }

  getProductById(_id: string): Product {
    return this.products.find(p => p._id == _id);
  }

  deleteProduct(_id: string): void {
    if (!this.getProductById(_id))
      throw new NotFoundException('Product not found or already deleted');

    this.products = this.products.filter(product => product._id !== _id);
  }
}

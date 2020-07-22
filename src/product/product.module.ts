import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Product } from './product.type';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [TypegooseModule.forFeature([Product])],
  providers: [ProductService, ProductResolver],
  controllers: [ProductController],
})
export class ProductModule {}

import { prop, ModelOptions, Ref, pre } from '@typegoose/typegoose';
import { Category } from 'src/category/category.type';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
@ModelOptions({ schemaOptions: { timestamps: true } })
@pre<Product>(/^find/, function() {
  this.populate('categories');
})
export class Product {
  @Field(() => ID)
  _id: string;

  @Field()
  @prop()
  public title: string;

  @Field()
  @prop()
  public description: string;

  @Field()
  @prop()
  public price: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => [Category], { nullable: true })
  @prop({ ref: 'Category' })
  public categories?: Ref<Category>[];
}

@ObjectType()
export class ProductPayload {
  @Field(() => Int)
  resourceCount: number;

  @Field(() => Int)
  pageCount: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => [Product])
  data: Product[];
}

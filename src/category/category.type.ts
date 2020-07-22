import { prop, pre, modelOptions, Ref } from '@typegoose/typegoose';
import { slugify } from 'src/utils/slugify';
import { Product } from 'src/product/product.type';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
@pre<Category>(/^save/, function() {
  this.slug = slugify(this.name, true);
})
export class Category {
  @Field(() => ID)
  _id: string;

  @Field()
  @prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @prop()
  slug?: string;

  @Field(() => [Product], { nullable: true })
  @prop({ ref: 'Product', localField: '_id', foreignField: 'categories' })
  products: Ref<Product>[];
}

import { prop, pre, modelOptions, Ref } from '@typegoose/typegoose';
import { slugify } from 'src/utils/slugify';
import { Product } from 'src/product/product.type';

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
  @prop({ required: true })
  name: string;

  @prop()
  slug?: string;

  @prop({ ref: 'Product', localField: '_id', foreignField: 'categories' })
  products: Ref<Product>[];
}

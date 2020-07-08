import { prop, ModelOptions, Ref, pre } from '@typegoose/typegoose';
import { Category } from 'src/category/category.type';

@ModelOptions({ schemaOptions: { timestamps: true } })
@pre<Product>(/^find/, function() {
  this.populate('categories');
})
export class Product {
  @prop()
  public title: string;

  @prop()
  public description: string;

  @prop()
  public price: number;

  @prop({ ref: 'Category' })
  public categories?: Ref<Category>[];
}

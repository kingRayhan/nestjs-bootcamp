import { prop, ModelOptions } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  @prop()
  public title: string;

  @prop()
  public description: string;

  @prop()
  public price: number;
}

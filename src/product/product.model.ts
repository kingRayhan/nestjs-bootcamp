import { v4 } from 'uuid';

export class Product {
  //   public title: string;
  //   public description: string;
  //   public price: number;
  public _id?: string;

  constructor(
    public title: string,
    public description: string,
    public price: number,
  ) {
    this._id = v4();
  }
}

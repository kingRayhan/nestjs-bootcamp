import { IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateProductInput {
  @IsNotEmpty({ message: 'title is required' })
  public title: string;

  @IsNotEmpty()
  @MinLength(15, {
    message: 'product description e kompokkhe 15 ti okkhor thakte hobe',
  })
  public description: string;

  @IsNotEmpty()
  public price: number;
}

export class UpdateProductInput {
  public title: string;

  @MinLength(15, {
    message: 'product description e kompokkhe 15 ti okkhor thakte hobe',
  })
  public description: string;

  public price: number;
}

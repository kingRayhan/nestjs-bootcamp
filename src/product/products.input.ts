import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductInput {
  @ApiProperty({ description: 'প্রোডাক্ট এর নাম' })
  @IsNotEmpty()
  public title: string;

  @ApiProperty({ description: 'প্রোডাক্ট এর বিবরণ' })
  @IsNotEmpty()
  @MinLength(15, {
    message: 'product description e kompokkhe 15 ti okkhor thakte hobe',
  })
  public description: string;

  @ApiProperty({ description: 'প্রোডাক্ট এর দাম' })
  @IsNotEmpty()
  public price: number;

  @ApiProperty({ description: 'ক্যাটাগরি সমুহের এর আইডি' })
  public categories: string[];
}

export class UpdateProductInput {
  @ApiProperty({ description: 'প্রোডাক্ট এর নাম' })
  @IsNotEmpty()
  public title: string;

  @MinLength(15, {
    message: 'product description e kompokkhe 15 ti okkhor thakte hobe',
  })
  @ApiProperty({ description: 'প্রোডাক্ট এর বিবরণ' })
  public description: string;

  @ApiProperty({ description: 'প্রোডাক্ট এর দাম' })
  public price: number;

  @ApiProperty({ description: 'ক্যাটাগরি সমুহের এর আইডি' })
  public categories: string[];
}

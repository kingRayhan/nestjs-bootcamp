import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryInput {
  @ApiProperty({ description: 'প্রোডাক্ট এর নাম' })
  @IsNotEmpty()
  @MinLength(5, { message: 'কম পক্ষে ৫টি অক্ষর থাকতেই হবে' })
  public name: string;
}

export class UpdateCategoryInput {
  @ApiProperty({ description: 'প্রোডাক্ট এর নাম' })
  @MinLength(5, { message: 'কম পক্ষে ৫টি অক্ষর থাকতেই হবে' })
  public name: string;
}

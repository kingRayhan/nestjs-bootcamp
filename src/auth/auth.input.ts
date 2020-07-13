import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  @ApiProperty({ description: 'username/email' })
  @IsNotEmpty()
  public identifier: string;

  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}

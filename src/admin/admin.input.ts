import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminInput {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  public username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  public password: string;
}

export class UpdateAdminInput {
  @ApiProperty()
  @IsOptional()
  public name?: string;

  @ApiProperty()
  @IsOptional()
  public username?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  public email?: string;

  @ApiProperty()
  @IsOptional()
  public password?: string;
}

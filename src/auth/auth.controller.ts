import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminInput } from 'src/admin/admin.input';
import { DocumentType } from '@typegoose/typegoose';
import { Admin } from 'src/admin/admin.type';
import { ApiTags } from '@nestjs/swagger';
import { LoginInput } from './auth.input';
import { AuthPayload } from './auth.type';
import { CreateUserInput } from '../user/user.input';
import { User } from 'src/user/user.type';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/register')
  async registerAdmin(
    @Body() data: CreateAdminInput,
  ): Promise<DocumentType<Admin>> {
    return this.authService.registerAdmin(data);
  }

  @Post('admin/login')
  async loginAdmin(@Body() data: LoginInput): Promise<AuthPayload> {
    return this.authService.loginAdmin(data);
  }

  @Post('/user/register')
  registerUser(@Body() data: CreateUserInput): Promise<User> {
    return this.authService.registerUser(data);
  }

  @Post('/user/login')
  loginUser(@Body() data: LoginInput): Promise<AuthPayload> {
    return this.authService.loginUser(data);
  }
}

import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminInput } from 'src/admin/admin.input';
import { DocumentType } from '@typegoose/typegoose';
import { Admin } from 'src/admin/admin.type';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginInput } from './auth.input';
import { AuthPayload } from './auth.type';
import { CreateUserInput } from '../user/user.input';
import { User } from 'src/user/user.type';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { SessionRequest } from 'src/session/session.type';

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

  @Post('/admin/logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  adminLogout(@Req() req: SessionRequest): Promise<boolean> {
    return this.authService.logoutAdmin(req.user.sub);
  }

  @Post('/user/register')
  registerUser(@Body() data: CreateUserInput): Promise<User> {
    return this.authService.registerUser(data);
  }

  @Post('/user/login')
  loginUser(@Body() data: LoginInput): Promise<AuthPayload> {
    return this.authService.loginUser(data);
  }

  @Post('/user/logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  userLogout(@Req() req: SessionRequest): Promise<boolean> {
    return this.authService.logoutUser(req.user.sub);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  logintofacebook() {
    return 'heyyy';
  }

  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  logintofacebookCallback(@Req() req) {
    return req.user;
  }

  @Get('/user/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getMe(@Req() req: SessionRequest) {
    return this.authService.getMe(req.user.sub);
  }
}

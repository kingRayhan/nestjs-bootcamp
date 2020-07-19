import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { CreateAdminInput } from 'src/admin/admin.input';
import { DocumentType } from '@typegoose/typegoose';
import { Admin } from 'src/admin/admin.type';
import { LoginInput } from './auth.input';
import { AuthPayload, AUTH_DOMAIN } from './auth.type';
import { SessionService } from 'src/session/session.service';
import { UserService } from '../user/user.service';
import { CreateUserInput } from '../user/user.input';
import { User } from 'src/user/user.type';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}

  async registerAdmin(data: CreateAdminInput): Promise<DocumentType<Admin>> {
    return this.adminService.create(data);
  }

  async loginAdmin(data: LoginInput): Promise<AuthPayload> {
    const admin = await this.adminService.getByIdentifier(data.identifier);
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    const matched = admin.comparePassword(data.password);
    if (!matched) throw new UnauthorizedException('Invalid credentials');

    const session = this.sessionService.findOrCreateSession(
      admin._id,
      AUTH_DOMAIN.ADMIN,
    );

    return session;
  }

  async logoutAdmin(adminId: string): Promise<any> {
    this.sessionService.deleteSession(adminId, AUTH_DOMAIN.ADMIN);
    return { message: 'Logged out successfully' };
  }

  async registerUser(data: CreateUserInput): Promise<User> {
    return this.userService.create(data);
  }

  async loginUser(data: LoginInput): Promise<AuthPayload> {
    const { identifier, password } = data;
    // get the user
    const user = await this.userService.getByIdentifier(identifier);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Match password
    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched)
      throw new UnauthorizedException('Invalid credentials');

    const session = await this.sessionService.findOrCreateSession(
      user._id,
      AUTH_DOMAIN.USER,
    );
    return session;
  }

  async logoutUser(userId: string): Promise<any> {
    this.sessionService.deleteSession(userId, AUTH_DOMAIN.USER);
    return { message: 'Logged out successfully' };
  }

  async getMe(userId: string): Promise<User> {
    return this.userService.getById(userId);
  }
}

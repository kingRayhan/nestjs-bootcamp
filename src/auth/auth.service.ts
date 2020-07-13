import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { CreateAdminInput } from 'src/admin/admin.input';
import { DocumentType } from '@typegoose/typegoose';
import { Admin } from 'src/admin/admin.type';
import { LoginInput } from './auth.input';
import { AuthPayload, AUTH_DOMAIN } from './auth.type';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly sessionService: SessionService,
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
}

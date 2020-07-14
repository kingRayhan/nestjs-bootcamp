import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Session } from './session.type';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AUTH_DOMAIN } from 'src/auth/auth.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session)
    private readonly model: ReturnModelType<typeof Session>,
    private readonly jwt: JwtService,
  ) {}

  async findOrCreateSession(
    sub: string,
    domain: AUTH_DOMAIN,
  ): Promise<DocumentType<Session>> {
    const session = await this.getSession(sub, domain);
    if (!session) {
      return this.createSession(sub, domain);
    }
    return session;
  }

  createSession(
    sub: string,
    domain: AUTH_DOMAIN,
  ): Promise<DocumentType<Session>> {
    const token = this.jwt.sign({ sub, domain });
    return this.model.create({ sub, domain, token });
  }

  async getSession(
    sub: string,
    domain: AUTH_DOMAIN,
  ): Promise<DocumentType<Session>> {
    return this.model.findOne({ sub, domain });
  }

  async deleteSession(sub: string, domain: AUTH_DOMAIN): Promise<boolean> {
    const deleted = await this.model.findOneAndDelete({ sub, domain });
    return deleted ? true : false;
  }
}

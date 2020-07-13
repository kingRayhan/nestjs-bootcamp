import { AUTH_DOMAIN } from 'src/auth/auth.type';
import { prop } from '@typegoose/typegoose';

export class Session {
  @prop()
  domain: AUTH_DOMAIN;

  @prop()
  token: string;

  @prop()
  sub: string;
}

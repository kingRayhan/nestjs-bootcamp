import { AUTH_DOMAIN } from 'src/auth/auth.type';
import { prop } from '@typegoose/typegoose';
import { Request } from 'express';

export class Session {
  @prop()
  domain: AUTH_DOMAIN;

  @prop()
  token: string;

  @prop()
  sub: string;
}

export interface JWTPayload {
  sub: string;
  domain: AUTH_DOMAIN;
}

export interface SessionRequest extends Request {
  user: JWTPayload;
}

export enum AUTH_DOMAIN {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class AuthPayload {
  token: string;
  domain: AUTH_DOMAIN;
}

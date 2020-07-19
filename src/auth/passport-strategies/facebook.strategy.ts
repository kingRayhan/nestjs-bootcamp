import { Strategy } from 'passport-facebook';
import { PassportStrategy } from '@nestjs/passport';
import { FacebookProfilePayload } from 'src/shared/types';
import { Injectable } from '@nestjs/common';
import { SessionService } from 'src/session/session.service';
import { UserService } from 'src/user/user.service';
import { AUTH_DOMAIN } from '../auth.type';
import { JWTPayload } from 'src/session/session.type';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: '675326143021425',
      clientSecret: '4a6904e68db89d7b80d92cbaded8c52a',
      callbackURL: 'http://localhost:4545/auth/facebook/callback',
      profileFields: ['id', 'email', 'displayName'],
    });
  }

  async validate(
    _: string,
    __: string,
    profile: FacebookProfilePayload,
  ): Promise<JWTPayload> {
    // 1. check user exists for this uid
    const user = await this.userService.findOrCreateWithFacebook(profile);

    // 2. Generate token for the user
    const sessionToken = await this.sessionService.findOrCreateSession(
      user._id,
      AUTH_DOMAIN.USER,
    );

    console.log(sessionToken);

    return sessionToken;
  }
}

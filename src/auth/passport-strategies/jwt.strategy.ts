import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { SessionService } from 'src/session/session.service';
import { JWTPayload } from 'src/session/session.type';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly sessionService: SessionService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
        ExtractJwt.fromBodyField('token'),
      ]),
      secretOrKey: 'secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: JWTPayload): Promise<JWTPayload> {
    // 1. check this token is exists or not

    const sessionExists = await this.sessionService.getSession(
      payload.sub,
      payload.domain,
    );

    if (!sessionExists)
      throw new UnauthorizedException(
        'You have already logged out. Login to get new token',
      );

    return sessionExists;
  }
}

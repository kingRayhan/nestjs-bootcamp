import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { SessionModule } from 'src/session/session.module';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './passport-strategies/jwt.strategy';
import { FacebookStrategy } from './passport-strategies/facebook.strategy';

@Module({
  imports: [AdminModule, SessionModule, UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, FacebookStrategy],
})
export class AuthModule {}

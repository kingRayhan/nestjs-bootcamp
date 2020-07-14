import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Session } from './session.type';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// const config = new ConfigService();

@Module({
  imports: [
    JwtModule.register({ secret: 'secret' }),
    TypegooseModule.forFeature([Session]),
  ],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { SessionModule } from 'src/session/session.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AdminModule, SessionModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

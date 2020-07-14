import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserService } from './user.service';
import { User } from './user.type';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

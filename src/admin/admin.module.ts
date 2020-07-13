import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Admin } from './admin.type';

@Module({
  imports: [TypegooseModule.forFeature([Admin])],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';
import { join } from 'path';

import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';

const config = new ConfigService();

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? 'envFilePath.prod' : '.env',
      isGlobal: true,
    }),
    TypegooseModule.forRoot(config.get('DATABASE_URL'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ProductModule,
    CategoryModule,
    AdminModule,
    AuthModule,
    SessionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}

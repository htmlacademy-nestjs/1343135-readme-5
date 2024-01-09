import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigAccountModule } from './config/config.module';
import { getMongooseOptions } from './mongoose';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigAccountModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
})
export class AppModule {}

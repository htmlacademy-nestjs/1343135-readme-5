import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigAccountModule } from './config/config.module';

@Module({
  imports: [UserModule, AuthModule, ConfigAccountModule],
})
export class AppModule {}

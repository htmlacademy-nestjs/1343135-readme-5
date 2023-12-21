import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { DefaultAuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ProviderToken } from './auth.const';

const AuthServiceProvider = {
  provide: ProviderToken.AuthService,
  useClass: DefaultAuthService,
};

@Module({
  imports: [UserModule],
  providers: [AuthServiceProvider],
  controllers: [AuthController],
})
export class AuthModule {}

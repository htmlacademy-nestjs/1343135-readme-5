import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserRepository } from './user.repository';
import { UserModel, UserSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}

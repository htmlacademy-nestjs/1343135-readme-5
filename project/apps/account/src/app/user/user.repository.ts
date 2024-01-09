import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/shared/repository';
import { User } from '@project/shared/types';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(@InjectModel(UserModel.name) userModel: Model<UserModel>) {
    super(userModel, UserEntity.fromObject);
  }
  public async findByEmail(email: User['email']) {
    const document = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(document);
  }
}

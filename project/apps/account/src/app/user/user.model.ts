import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserAuth } from '@project/shared/types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements UserAuth {
  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop()
  public createdAt: string;

  @Prop({
    required: true,
  })
  public postsCount: number;

  @Prop({
    required: true,
  })
  public subsribersCount: number;

  @Prop()
  public avatar?: string;

}

export const UserSchema = SchemaFactory.createForClass(UserModel);

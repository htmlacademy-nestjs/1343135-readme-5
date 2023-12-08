import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.const';
import type { UserAuth, User } from '@project/shared/types';
import { Entity } from '@project/shared/repository';

export class UserEntity implements Entity<UserAuth> {
  public id?: string;
  public email: string;
  public name: string;
  public createdAt: string;
  public postsCount: number;
  public subsribersCount: number;
  public passwordHash: string;
  public avatar?: string | undefined;

  constructor(dto: User) {
    this.email = dto.email;
    this.name = dto.name;
    this.createdAt = dto.createdAt;
    this.postsCount = dto.postsCount;
    this.subsribersCount = dto.subsribersCount;
    this.avatar = dto.avatar;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async checkPassword(password: string) {
    return Boolean(this.passwordHash) && await compare(password, this.passwordHash);
  }
}

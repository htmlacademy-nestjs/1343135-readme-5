import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.const';
import type { UserAuth, User } from '@project/shared/types';
import { Entity } from '@project/shared/repository';

export class UserEntity implements Entity<UserAuth> {
  public id?: string;
  public email: string;
  public name: string;
  public postsCount: number;
  public subsribersCount: number;
  public passwordHash: string;
  public createdAt?: string;
  public avatar?: string | undefined;

  constructor(dto: User) {
    this.id = dto.id;
    this.email = dto.email;
    this.name = dto.name;
    this.postsCount = dto.postsCount;
    this.subsribersCount = dto.subsribersCount;
    this.createdAt = dto.createdAt;
    this.avatar = dto.avatar;
    this.passwordHash = dto.passwordHash;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async checkPassword(password: string) {
    return compare(password, this.passwordHash);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      postsCount: this.postsCount,
      subsribersCount: this.subsribersCount,
      createdAt: this.createdAt,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
    }
  }

  static fromObject(data: UserAuth) {
    return new UserEntity(data);
  }
}

import { Injectable } from '@nestjs/common';
import { MemoryRepository } from '@project/shared/repository'
import { User } from '@project/shared/types';
import { UserEntity } from './user.entity';

@Injectable()
export class UserMemoryRepository extends MemoryRepository<UserEntity> {
  public async findByEmail(email: User['email']) {
    return Array.from(
      this.memo.values()).find((user) => user.email === email
    ) || null;
  }
}

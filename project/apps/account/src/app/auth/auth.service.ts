import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UserChangePasswordRequestDto, UserCreateRequestDto, UserGetRequestDto, UserLoginRequestDto } from './dto';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service.interface';

@Injectable()
export class DefaultAuthService implements AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: UserCreateRequestDto) {
    const existing = await this.userRepository.findByEmail(dto.email);

    if (existing) {
      throw new ConflictException(`User with email "${dto.email}" already exists`)
    }

    const entity = new UserEntity({
      ...dto,
      createdAt: new Date().toISOString(),
      subsribersCount: 0,
      postsCount: 0,
      passwordHash: '',
    });
    await entity.setPassword(dto.password);

    return this.userRepository.save(entity);
  }

  public async getById(dto: UserGetRequestDto) {
    const user = await this.userRepository.findById(dto.id);

    if (!user) {
      throw new NotFoundException(`User with id "${dto.id}" not found`);
    }

    return user;
  }

  public async verify(dto: UserLoginRequestDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundException(`User with email ${dto.email} not found`);
    }

    const isCorrectPassword = await user.checkPassword(dto.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Invalid login or password');
    }

    return user;
  }

  public async changePassword(dto: UserChangePasswordRequestDto) {
    const user = await this.getById(dto);
    const isCorrectPassword = await user.checkPassword(dto.oldPassword);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Invalid login or password');
    }

    await user.setPassword(dto.newPassword);

    return this.userRepository.update(dto.id, user);
  }
}

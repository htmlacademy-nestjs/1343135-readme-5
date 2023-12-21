import { UserEntity } from "../user/user.entity";
import {
  UserChangePasswordRequestDto,
  UserCreateRequestDto,
  UserGetRequestDto,
  UserLoginRequestDto
} from "./dto";

export interface AuthService {
  register(dto: UserCreateRequestDto): Promise<UserEntity>;
  verify(dto: UserLoginRequestDto): Promise<UserEntity>;
  getById(dto: UserGetRequestDto): Promise<UserEntity>;
  changePassword(dto: UserChangePasswordRequestDto): Promise<UserEntity>;
}

import { Body, Controller, Get, HttpCode, Inject, Param, Patch, Post } from '@nestjs/common';
import { fillDto } from '@project/shared/helpers';
import { AuthService } from './auth.service.interface';
import { UserChangePasswordRequestDto, UserCreateRequestDto, UserGetRequestDto, UserLoginRequestDto, UserResponseDto } from './dto';
import { StatusCodes } from 'http-status-codes';
import { ProviderToken } from './auth.const';

@Controller('auth')
export class AuthController {
  constructor(@Inject(ProviderToken.AuthService) private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() dto: UserCreateRequestDto) {
    const user = await this.authService.register(dto);

    return fillDto(UserResponseDto, user)
  }

  @Post('login')
  @HttpCode(StatusCodes.OK)
  public async login(@Body() dto: UserLoginRequestDto) {
    const user = await this.authService.verify(dto);

    return fillDto(UserResponseDto, user)
  }

  @Patch('password')
  public async changePassword(@Body() dto: UserChangePasswordRequestDto) {
    const user = await this.authService.changePassword(dto);

    return fillDto(UserResponseDto, user);
  }

  @Get('/:id')
  public async get(@Param() dto: UserGetRequestDto) {
    const user = await this.authService.getById(dto);

    return fillDto(UserResponseDto, user);
  }
}

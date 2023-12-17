import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from '@nestjs/common';
import { fillDto } from '@project/shared/helpers';
import { AuthService } from './auth.service.interface';
import { UserChangePasswordRequestDto, UserCreateRequestDto, UserGetRequestDto, UserLoginRequestDto, UserResponseDto } from './dto';
import { ProviderToken } from './auth.const';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(ProviderToken.AuthService) private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
    type: UserResponseDto,
  })
  @Post('register')
  public async register(@Body() dto: UserCreateRequestDto) {
    const user = await this.authService.register(dto);

    return fillDto(UserResponseDto, user)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in.',
    type: UserResponseDto,
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: UserLoginRequestDto) {
    const user = await this.authService.verify(dto);

    return fillDto(UserResponseDto, user)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password successfully changed.',
    type: UserResponseDto,
  })
  @Patch('password')
  public async changePassword(@Body() dto: UserChangePasswordRequestDto) {
    const user = await this.authService.changePassword(dto);

    return fillDto(UserResponseDto, user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User info.',
    type: UserResponseDto,
  })
  @Get('/:id')
  public async get(@Param() dto: UserGetRequestDto) {
    const user = await this.authService.getById(dto);

    return fillDto(UserResponseDto, user);
  }
}

import { ApiProperty } from "@nestjs/swagger";

export class UserCreateRequestDto {
  @ApiProperty({
    description: 'User email',
    example: 'kiki@mail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Kiki',
  })
  public name: string;

  @ApiProperty({
    description: 'Password',
    example: 'my_cool_safe_pass1',
  })
  public password: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'https://placehold.co/600x400',
  })
  public avatar?: string;
}

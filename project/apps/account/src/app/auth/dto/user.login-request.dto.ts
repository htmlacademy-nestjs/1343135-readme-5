import { ApiProperty } from "@nestjs/swagger";

export class UserLoginRequestDto {
  @ApiProperty({
    description: 'User email',
    example: 'kiki@mail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'Password',
    example: 'safest_pass_1*',
  })
  public password: string;
}

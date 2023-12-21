import { ApiProperty } from "@nestjs/swagger";

export class UserChangePasswordRequestDto {
  @ApiProperty({
    description: 'User id',
    example: 'df2c98c5-3aa1-4633-b9ad-614a625846eb',
  })
  public id: string;

  @ApiProperty({
    description: 'Old password',
    example: 'my_pass',
  })
  public oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'new_my_pass',
  })
  public newPassword: string;
}

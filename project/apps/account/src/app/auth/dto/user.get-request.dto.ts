import { ApiProperty } from "@nestjs/swagger";

export class UserGetRequestDto {
  @ApiProperty({
    description: 'User id',
    example: 'df2c98c5-3aa1-4633-b9ad-614a625846eb',
  })
  public id: string;
}

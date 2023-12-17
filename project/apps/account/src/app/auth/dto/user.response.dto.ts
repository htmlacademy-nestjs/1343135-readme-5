import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer'

export class UserResponseDto {
  @ApiProperty({
    description: 'User id',
    example: 'df2c98c5-3aa1-4633-b9ad-614a625846eb',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Kiki',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Date of profile creation',
    example: '2023-12-17T15:48:14.119Z',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Number of user posts',
    example: 12,
  })
  @Expose()
  public postsCount: number;

  @ApiProperty({
    description: 'Number of subscribers',
    example: 10,
  })
  @Expose()
  public subsribersCount: number;

  @ApiProperty({
    description: 'User avatar url',
    example: 'https://placehold.co/600x400',
  })
  @Expose()
  public avatar?: string;
}

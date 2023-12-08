import { Expose } from 'class-transformer'

export class UserResponseDto {
  @Expose()
  public id: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public postsCount: number;

  @Expose()
  public subsribersCount: number;

  @Expose()
  public avatar?: string;
}

import { Pagination } from "@project/shared/types";
import { PostEntity } from "../post.entity";
import { ApiProperty } from "@nestjs/swagger";

export class PostGetResponseDto implements Pagination {
  @ApiProperty()
  public pageNumber: number;

  @ApiProperty()
  public pageSize: number;

  @ApiProperty()
  public total: number;

  @ApiProperty()
  public posts: PostEntity[];
}

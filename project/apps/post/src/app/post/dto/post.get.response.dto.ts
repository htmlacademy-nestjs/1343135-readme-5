import { Pagination } from "@project/shared/types";
import { PostEntity } from "../post.entity";

export class PostGetResponseDto implements Pagination {
  public pageNumber: number;
  public pageSize: number;
  public total: number;
  public posts: PostEntity[];
}

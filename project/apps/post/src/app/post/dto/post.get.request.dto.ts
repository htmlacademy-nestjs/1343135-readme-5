import { Pagination } from "@project/shared/types";

export class PostGetRequestDto implements Pagination {
  public pageNumber?: number;
  public pageSize?: number;
}

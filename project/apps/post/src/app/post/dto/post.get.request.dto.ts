import { ApiPropertyOptional } from "@nestjs/swagger";
import { Pagination } from "@project/shared/types";

export class PostGetRequestDto implements Pagination {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
  })
  public pageNumber?: number;

  @ApiPropertyOptional({
    description: 'Page size',
    example: 10,
  })
  public pageSize?: number;
}

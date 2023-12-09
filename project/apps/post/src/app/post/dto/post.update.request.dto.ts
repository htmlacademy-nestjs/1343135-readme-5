import { PostType, PostTypeValue, Tag } from '@project/shared/types';

export class PostUpdateCommonDto {
  public tags?: Tag[];
}

export class PostVideoUpdateRequestDto extends PostUpdateCommonDto {
  public title?: string;
  public url?: string;
}

export class PostTextUpdateRequestDto extends PostUpdateCommonDto {
  public title?: string;
  public description?: string;
  public text?: string;
}

export class PostQuoteUpdateRequestDto extends PostUpdateCommonDto {
  public text?: string;
  public quoteAuthor?: string;
}

export class PostPhotoUpdateRequestDto extends PostUpdateCommonDto {
  public url?: string;
}

export class PostLinkUpdateRequestDto extends PostUpdateCommonDto {
  public url?: string;
  public description?: string;
}

export type PostTypeUpdateRequestDto = {
  [PostType.Video]: PostVideoUpdateRequestDto;
  [PostType.Text]: PostTextUpdateRequestDto;
  [PostType.Quote]: PostQuoteUpdateRequestDto;
  [PostType.Photo]: PostPhotoUpdateRequestDto;
  [PostType.Link]: PostLinkUpdateRequestDto;
};

export type PostUpdateRequestDto = PostTypeUpdateRequestDto[PostTypeValue];

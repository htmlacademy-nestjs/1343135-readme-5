import { PostType, PostTypeValue, Tag } from '@project/shared/types';

export class PostCreateCommonDto {
  public author: string;
  public isRepost: boolean;
  public type: PostTypeValue;
  public tags?: Tag[];
  public original?: string;
}

class PostVideoContent {
  public title: string;
  public url: string;
}

export class PostVideoCreateRequestDto extends PostCreateCommonDto {
  public type: typeof PostType.Video;
  public content: PostVideoContent;
}

class PostTextContent {
  public title: string;
  public description: string;
  public text: string;
}

export class PostTextCreateRequestDto extends PostCreateCommonDto {
  public type: typeof PostType.Text;
  public content: PostTextContent;
}

class PostQuoteContent {
  public text: string;
  public quoteAuthor: string;
}

export class PostQuoteCreateRequestDto extends PostCreateCommonDto {
  public type: typeof PostType.Quote;
  public content: PostQuoteContent;
}

class PostPhotoContent {
  public url: string;
}
export class PostPhotoCreateRequestDto extends PostCreateCommonDto {
  public type: typeof PostType.Photo;
  public content: PostPhotoContent;
}

class PostLinkContent {
  public url: string;
  public description?: string;
}
export class PostLinkCreateRequestDto extends PostCreateCommonDto {
  public type: typeof PostType.Link;
  public content: PostLinkContent;
}

export type PostTypeCreateRequestDto = {
  [PostType.Video]: PostVideoCreateRequestDto;
  [PostType.Text]: PostTextCreateRequestDto;
  [PostType.Quote]: PostQuoteCreateRequestDto;
  [PostType.Photo]: PostPhotoCreateRequestDto;
  [PostType.Link]: PostLinkCreateRequestDto;
};

export type PostCreateByTypeRequestDto<T extends PostTypeValue> = PostTypeCreateRequestDto[T];
export type PostCreateRequestDto = PostTypeCreateRequestDto[PostTypeValue];

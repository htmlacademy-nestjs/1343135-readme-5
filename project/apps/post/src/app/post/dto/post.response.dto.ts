import { ApiProperty, ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { PostStatus, PostStatusValue, PostType, PostTypeValue } from '@project/shared/types';
import { PostTagDto } from './post.tag.dto';

export class PostResponseCommonDto {
  @ApiProperty({
    description: 'Post id',
    example: 'df2c98c5-3aa1-4633-b9ad-614a625846eb',
  })
  public id: string;

  @ApiProperty({
    description: 'Post status',
    example: PostStatus.Published,
    enum: PostStatus,
    type: PostStatus,
  })
  public status: PostStatusValue;

  @ApiProperty({
    description: 'Date and time of post creation',
    example: '2023-12-20T21:20:06.710Z',
  })
  public createdAt: string;

  @ApiProperty({
    description: 'Date and time of post publication',
    example: '2023-12-20T21:20:06.710Z',
  })
  public publishedAt: string;

  @ApiProperty({
    description: 'Author id',
    example: 'df2c98c5-3aa1-4633-b9ad-614a625846eb',
  })
  public author: string;

  @ApiProperty({
    description: 'Is this a repost',
    example: false,
  })
  public isRepost: boolean;

  @ApiPropertyOptional({
    description: 'Tags',
    example: [{ text: 'sport' }, { text: 'news' }],
  })
  public tags?: PostTagDto[];

  @ApiPropertyOptional({
    description: 'Original post id for repost',
    example: 'df2c98c5-3aa1-4633-b9ad-614a625846eb',
  })
  public original?: string;

  @ApiProperty({
    description: 'Type of a post',
    example: PostType.Video,
  })
  public type: PostTypeValue;
}

class PostVideoContent {
  @ApiProperty({
    description: 'Video title',
    example: 'Funny cat',
  })
  public title: string;

  @ApiProperty({
    description: 'Video url',
    example: 'http://cloud.com/cat-is-funny',
  })
  public url: string;
}

export class PostVideoResponseDto extends PostResponseCommonDto {
  @ApiProperty({
    description: 'Type of a post',
    example: PostType.Video,
  })
  public type: typeof PostType.Video;

  @ApiProperty({
    description: 'Video post content',
    type: PostVideoContent,
  })
  public content: PostVideoContent;
}

class PostTextContent {
  @ApiProperty({
    description: 'Post title',
    example: 'How I don\'t wonna work',
  })
  public title: string;

  @ApiProperty({
    description: 'Post description',
    example: 'Еhe story of how I don\'t want to work',
  })
  public description: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Strongly',
  })
  public text: string;
}

export class PostTextResponseDto extends PostResponseCommonDto {
  @ApiProperty({
    description: 'Type of a post',
    example: PostType.Text,
  })
  public type: typeof PostType.Text;

  @ApiProperty({
    description: 'Post text',
    type: PostTextContent,
  })
  public content: PostTextContent;
}

class PostQuoteContent {
  @ApiProperty({
    description: 'Quote text',
    example: 'One can not just...',
  })
  public text: string;

  @ApiProperty({
    description: 'Quote author name',
    example: 'Some guy from the meme',
  })
  public quoteAuthor: string;
}

export class PostQuoteResponseDto extends PostResponseCommonDto {
  @ApiProperty({
    description: 'Type of a post',
    example: PostType.Quote,
  })
  public type: typeof PostType.Quote;

  @ApiProperty({
    description: 'Quote post content',
    type: PostQuoteContent,
  })
  public content: PostQuoteContent;
}

class PostPhotoContent {
  @ApiProperty({
    description: 'Photo url',
    example: 'https://placehold.co/600x400',
  })
  public url: string;
}
export class PostPhotoResponseDto extends PostResponseCommonDto {
  @ApiProperty({
    description: 'Post type',
    example: PostType.Photo,
  })
  public type: typeof PostType.Photo;

  @ApiProperty({
    description: 'Photo post content',
    type: PostPhotoContent,
  })
  public content: PostPhotoContent;
}

class PostLinkContent {
  @ApiProperty({
    description: 'Link url',
    example: 'https://www.wikipedia.org/',
  })
  public url: string;

  @ApiPropertyOptional({
    description: 'Link description',
    example: 'Wikipedia The Free Encyclopedia',
  })
  public description?: string;
}
export class PostLinkResponseDto extends PostResponseCommonDto {
  @ApiProperty({
    description: 'Post type',
    example: PostType.Link,
  })
  public type: typeof PostType.Link;

  @ApiProperty({
    description: 'Post link content',
    type: PostLinkContent,
  })
  public content: PostLinkContent;
}

export const PostResponseDto = IntersectionType(PostVideoResponseDto, PostTextResponseDto, PostQuoteResponseDto, PostPhotoResponseDto, PostLinkResponseDto);
// export type PostResponseDto =
//   | PostVideoResponseDto
//   | PostTextResponseDto
//   | PostQuoteResponseDto
//   | PostPhotoResponseDto
//   | PostLinkResponseDto;

import { Tag } from "./tag.type";

export const PostType = {
  Video: 'video',
  Text: 'text',
  Quote: 'quote',
  Photo: 'photo',
  Link: 'link',
} as const;

export type PostTypeValue = typeof PostType[keyof typeof PostType];

export const PostStatus = {
  Draft: 'draft',
  Published: 'published',
} as const;

export type PostStatusValue = typeof PostStatus[keyof typeof PostStatus];

export type PostVideoContent = {
  title: string;
  url: string;
};

export type PostTextContent = {
  title: string;
  description: string;
  text: string;
};

export type PostQuoteContent = {
  text: string;
  quoteAuthor: string;
}

export type PostPhotoContent = {
  url: string;
};

export type PostLinkContent = {
  url: string;
  description?: string;
};

export type PostContent =
  | PostVideoContent
  | PostTextContent
  | PostQuoteContent
  | PostPhotoContent
  | PostLinkContent;

export type PostContentTypeMap = {
  [Type in PostTypeValue]: PostTypeMap[Type]['content']
}

export type ContentType<T extends PostTypeValue> = PostContentTypeMap[T];

export type PostVideoContentByType = {
  type: typeof PostType.Video;
  content: PostVideoContent;
};

export type PostTextContentByType = {
  type: typeof PostType.Text;
  content: PostTextContent;
};

export type PostQuoteContentByType = {
  type: typeof PostType.Quote;
  content: PostQuoteContent;
};

export type PostPhotoContentByType = {
  type: typeof PostType.Photo;
  content: PostPhotoContent;
};

export type PostLinkContentByType = {
  type: typeof PostType.Link;
  content: PostLinkContent;
};

export type PostCommon = {
  author: string;
  status: PostStatusValue;
  isRepost: boolean;
  type: PostTypeValue;
  createdAt: string;
  publishedAt: string;
  tags?: Tag[];
  original?: string;
}

export type PostVideo = PostCommon & PostVideoContentByType;
export type PostText = PostCommon & PostTextContentByType;
export type PostQuote = PostCommon & PostQuoteContentByType;
export type PostPhoto = PostCommon & PostPhotoContentByType;
export type PostLink = PostCommon & PostLinkContentByType;

export type PostTypeMap = {
  [PostType.Video]: PostVideo;
  [PostType.Text]: PostText;
  [PostType.Quote]: PostQuote;
  [PostType.Photo]: PostPhoto;
  [PostType.Link]: PostLink;
}

export type PostByType<T extends PostTypeValue> = PostTypeMap[T];

export type Post =
  | PostVideo
  | PostText
  | PostQuote
  | PostPhoto
  | PostLink;

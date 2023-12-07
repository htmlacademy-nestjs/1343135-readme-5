import { Tag } from "./tag.type";

export const PostType = {
  Video: 'video',
  Text: 'text',
  Quote: 'quote',
  Photo: 'photo',
  Link: 'link',
} as const;

export type PostTypeValue = typeof PostType[keyof typeof PostType];

export const PostState = {
  Draft: 'draft',
  Published: 'published',
} as const;

export type PostStateValue = typeof PostState[keyof typeof PostState];

type PostCommon = {
  author: string;
  state: PostStateValue;
  isRepost: boolean;
  createdAt: string;
  publishedAt: string;
  tags?: Tag[];
  original?: string;
}

export type PostVideo = {
  type: typeof PostType.Video;
  title: string;
  url: string;
};

export type PostText = {
  type: typeof PostType.Text;
  title: string;
  description: string;
  text: string;
};

export type PostQuote = {
  type: typeof PostType.Quote;
  text: string;
  author: string;
};

export type PostPhoto = {
  type: typeof PostType.Photo;
  url: string;
};

export type PostLink = {
  type: typeof PostType.Link;
  url: string;
  decription: string;
};

export type Post = PostCommon & (PostVideo | PostText | PostQuote | PostPhoto | PostLink);

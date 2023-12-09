import {
  PostCommon,
  PostStatusValue,
  Tag,
  PostType,
  PostTypeValue,
  PostVideoContent,
  PostTextContent,
  PostQuoteContent,
  PostPhotoContent,
  PostLinkContent,
  Post,
  PostTypeMap,
  PostVideo,
  PostText,
  PostQuote,
  PostPhoto,
  PostLink,
} from "@project/shared/types";
import { Entity } from "@project/shared/repository";
import { Injectable } from "@nestjs/common";

abstract class BasePostEntity implements Entity<PostCommon> {
  public author: string;
  public status: PostStatusValue;
  public isRepost: boolean;
  public type: PostTypeValue;
  public content: Record<string, unknown>;
  public createdAt: string;
  public publishedAt: string;
  public tags?: Tag[];
  public original?: string;
  public id?: string;

  constructor(post: Entity<PostCommon>) {
    this.author = post.author;
    this.status = post.status;
    this.isRepost = post.isRepost;
    this.createdAt = post.createdAt;
    this.publishedAt = post.publishedAt;
    this.tags = post.tags;
    this.original = this.isRepost ? post.original : undefined;
    this.id = post.id;
  }

  public update(patch: Partial<PostCommon>) {
    this.status = patch.status ?? this.status;
    this.tags = patch.tags ?? this.tags;
    return this;
  }
}

class PostVideoEntity extends BasePostEntity implements Entity<PostVideo> {
  public type = PostType.Video;
  public content: PostVideoContent;

  constructor(post: PostVideo) {
    super(post);

    this.content = {
      title: post.content.title,
      url: post.content.url,
    }
  }

  public update(patch: Partial<PostVideo>) {
    super.update(patch);

    this.content = {
      title: patch.content?.title ?? this.content.title,
      url: patch.content?.url ?? this.content.url,
    }

    return this;
  }
}

class PostTextEntity extends BasePostEntity implements Entity<PostText> {
  public type = PostType.Text;
  public content: PostTextContent;

  constructor(post: PostText) {
    super(post);

    this.content = {
      title: post.content.title,
      description: post.content.description,
      text: post.content.text,
    }
  }

  public update(patch: Partial<PostText>) {
    super.update(patch);

    this.content = {
      title: patch.content?.title ?? this.content.title,
      description: patch.content?.description ?? this.content.description,
      text: patch.content?.text ?? this.content.text,
    }

    return this;
  }
}

class PostQuoteEntity extends BasePostEntity implements Entity<PostQuote> {
  public type = PostType.Quote;
  public content: PostQuoteContent;

  constructor(post: PostQuote) {
    super(post);

    this.content = {
      text: post.content.text,
      quoteAuthor: post.content.quoteAuthor,
    }
  }

  public update(patch: Partial<PostQuote>) {
    super.update(patch);

    this.content = {
      text: patch.content?.text ?? this.content.text,
      quoteAuthor: patch.content?.quoteAuthor ?? this.content.quoteAuthor,
    }

    return this;
  }
}

class PostPhotoEntity extends BasePostEntity implements Entity<PostPhoto> {
  public type = PostType.Photo;
  public content: PostPhotoContent;

  constructor(post: PostPhoto) {
    super(post);

    this.content = {
      url: post.content.url,
    }
  }

  public update(patch: Partial<PostPhoto>) {
    super.update(patch);

    this.content = {
      url: patch.content?.url ?? this.content.url,
    };

    return this;
  }
}

class PostLinkEntity extends BasePostEntity implements Entity<PostLink> {
  public type = PostType.Link;
  public content: PostLinkContent;

  constructor(post: PostLink) {
    super(post);

    this.content = {
      url: post.content.url,
      description: post.content.description,
    };
  }

  public update(patch: Partial<PostLink>) {
    super.update(patch);

    this.content = {
      url: patch.content?.url ?? this.content.url,
      description: patch.content?.description ?? this.content.description,
    };

    return this;
  }
}

@Injectable()
export class PostEntityFactory {
  public create<T extends PostTypeValue>(type: T, post: PostTypeMap[T]) {
    switch(type) {
      case PostType.Video:
        return new PostVideoEntity(post as PostVideo);
      case PostType.Text:
        return new PostTextEntity(post as PostText);
      case PostType.Quote:
        return new PostQuoteEntity(post as PostQuote);
      case PostType.Photo:
        return new PostPhotoEntity(post as PostPhoto);
      case PostType.Link:
        return new PostLinkEntity(post as PostLink);
      default:
        throw new Error('unknown post type');
    }
  }
}

export type PostEntity = Entity<Post>;

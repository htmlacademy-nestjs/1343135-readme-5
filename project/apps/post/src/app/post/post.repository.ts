import {
  Post,
  PostByType,
  PostContent,
  PostLinkContent,
  PostPhotoContent,
  PostQuoteContent,
  PostTextContent,
  PostType,
  PostTypeValue,
  PostVideoContent,
} from '@project/shared/types';
import { Entity, MemoryRepository } from '@project/shared/repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

type PostCommonRecord = Post & { content: string; }

@Injectable()
export class PostVideoContentRepository extends MemoryRepository<Entity<PostVideoContent>> {}

@Injectable()
export class PostTextContentRepository extends MemoryRepository<Entity<PostTextContent>> {}

@Injectable()
export class PostQuoteContentRepository extends MemoryRepository<Entity<PostQuoteContent>> {}

@Injectable()
export class PostPhotoContentRepository extends MemoryRepository<Entity<PostPhotoContent>> {}

@Injectable()
export class PostLinkContentRepository extends MemoryRepository<Entity<PostLinkContent>> {}

@Injectable()
export class PostRepository extends MemoryRepository<Entity<Post>> {
  protected readonly memo = new Map<string, PostCommonRecord>();

  constructor(
    private readonly postVideoContentRepository: PostVideoContentRepository,
    private readonly postTextContentRepository: PostTextContentRepository,
    private readonly postQuoteContentRepository: PostQuoteContentRepository,
    private readonly postPhotoContentRepository: PostPhotoContentRepository,
    private readonly postLinkContentRepository: PostLinkContentRepository,
  ) {
    super();
  }

  public async findById(id: string) {
    const post = this.memo.get(id);

    if (!post) {
      throw new NotFoundException(`Post with id "${id}" not found`);
    }

    const contentEntity = await this.getContent(post.type, post.content);

    if (!contentEntity) {
      throw new NotFoundException(`Post with id ${id} has no content`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, ...content } = contentEntity;

    return {
      ...post,
      content,
    } as Entity<Post>;
  }

  public async save<T extends PostTypeValue>(entity: Entity<PostByType<T>>) {
    const contentRepository = this.getContentRepository(entity.type);
    const contentEntity = await contentRepository.save(entity.content);
    const { id: contentId, ...content } = contentEntity;

    const mainPost = {
      ...entity,
      id: entity.id ?? randomUUID(),
      content: contentId,
     };

    this.memo.set(mainPost.id, mainPost);

    return {
      ...mainPost,
      content,
    }
  }

  public async update<T extends PostTypeValue>(id: string, entity: Entity<PostByType<T>>) {
    const post = this.memo.get(id);

    if (!post) {
      throw new NotFoundException(`Post with id "${id}" not found`);
    }

    const contentRepository = this.getContentRepository(post.type);
    const contentEntity = await contentRepository.findById(post.content);

    if (!contentEntity) {
      throw new NotFoundException(`Post with id ${id} has no content`);
    }

    const updatedContent = await contentRepository.update(
      contentEntity.id,
      { ...contentEntity, ...entity.content },
    );
    const { id: contentId, ...content } = updatedContent;
    const updatedPost = { ...post, ...entity, content: contentId, id }

    this.memo.set(id, updatedPost);
    return {
      ...updatedPost,
      content,
    };
  }

  public async deleteById(id: string) {
    const post = this.memo.get(id);

    if (!post) {
      throw new NotFoundException(`Post with id "${id}" not found`);
    }

    const contentRepository = this.getContentRepository(post.type);
    await contentRepository.deleteById(post.content);

    super.deleteById(id);
  }

  private async getContent(type: PostTypeValue, id: string) {
    const contentRepository = this.getContentRepository(type);
    return contentRepository.findById(id);
  }

  private getContentRepository(type: PostTypeValue)
    : MemoryRepository<Entity<PostContent>>  {
    switch (type) {
      case PostType.Video:
        return this.postVideoContentRepository;
      case PostType.Text:
        return this.postTextContentRepository;
      case PostType.Quote:
        return this.postQuoteContentRepository;
      case PostType.Photo:
        return this.postPhotoContentRepository;
      case PostType.Link:
        return this.postLinkContentRepository;
      default:
        throw new Error('Unknown post type');
    }
  }
}

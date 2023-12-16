import {
  Pagination,
  Post,
  PostByType,
  PostContent,
  PostStatus,
  PostType,
  PostTypeValue,
} from '@project/shared/types';
import { Entity, MemoryRepository } from '@project/shared/repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PostEntity } from './post.entity';
import {
  PostLinkContentRepository,
  PostPhotoContentRepository,
  PostQuoteContentRepository,
  PostTextContentRepository,
  PostVideoContentRepository,
} from './post.content-repository';
import { TagRepository } from '../tag/tag.repository';
import { TagPostRepository } from '../tag/tag-post.repository';

type PostCommonRecord = Post & { content: string; }

@Injectable()
export class PostRepository extends MemoryRepository<Entity<Post>> {
  protected readonly memo = new Map<string, PostCommonRecord>();

  constructor(
    private readonly postVideoContentRepository: PostVideoContentRepository,
    private readonly postTextContentRepository: PostTextContentRepository,
    private readonly postQuoteContentRepository: PostQuoteContentRepository,
    private readonly postPhotoContentRepository: PostPhotoContentRepository,
    private readonly postLinkContentRepository: PostLinkContentRepository,
    private readonly tagRepository: TagRepository,
    private readonly tagPostRepository: TagPostRepository,
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

    const tagIds = await this.tagPostRepository.findByPost(id);
    const tags = await this.tagRepository.findByIdMany(tagIds.map((item) => item.tagId));
    const tagsToReturn = tags
      .map((tag) => {
        if (!tag) {
          throw new Error('Could not find a tag');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = tag;
        return rest;
      })

    return {
      ...post,
      content,
      tags: tagsToReturn,
    } as Entity<Post>;
  }

  public async save<T extends PostTypeValue>(entity: Entity<PostByType<T>>) {
    const contentRepository = this.getContentRepository(entity.type);
    const contentEntity = await contentRepository.save(entity.content);
    const { id: contentId, ...content } = contentEntity;
    const tags = entity.tags?.length ? await this.tagRepository.saveMany(entity.tags) : [];
    const tagsToSave = tags.map((tag) => tag.id);
    const tagsToReturn = tags.map((tag) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = tag;
      return rest;
    });

    const postToSave = {
      ...entity,
      id: entity.id ?? randomUUID(),
      tags: tagsToSave,
      content: contentId,
    };

    await this.tagPostRepository.saveMany(
      tagsToSave.flatMap((tagId) => tagId ? [({ tagId, postId: postToSave.id })] : []),
    );

    const postToReturn = {
      ...postToSave,
      content,
      tags: tagsToReturn,
    };

    this.memo.set(postToSave.id, postToSave as PostCommonRecord);

    return postToReturn;
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
    const updatedPost = { ...post, ...entity, content: contentId, id };

    /**
     * TODO:
     * - check if entity patch contains tags
     * - remove old tags from tagPost repo
     * - check if all of old tags are used in other posts
     * - delete unused tags from tags repo
     * - save new tags in tagPost & tags repos
    */

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

    /**
     * TODO:
     * - remove tagPosts from tagPost repo
     * - check if all tags are used in other posts
     * - delete unused tags from tags repo
    */

    super.deleteById(id);
  }

  public async index({pageNumber, pageSize }: Required<Pagination>) {
    /**
     * TODO:
     * - sort by publishedAt, likeCount, commentCount
     * - draft list for authorized
     * - post list by tag
     */
    const sliceStart = (pageNumber - 1) * pageSize;
    const sliceEnd = sliceStart + pageSize;
    const allPosts = [...this.memo.values()];
    const mainPosts = allPosts
      .sort((a, b) => new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf())
      .filter((item) => item.status === PostStatus.Published)
      .slice(sliceStart, sliceEnd);
    const postsWithContent = await Promise.all(
      mainPosts
        .map(async (item) => {
          const contentEntity = await this.getContent(item.type, item.content);

          if (!contentEntity) {
            throw new NotFoundException(`Post with id ${'id' in item ? item.id : ''} has no content`);
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const{ id, ...content } = contentEntity;
          return { ...item, content }
        })
    );

    return {
      posts: postsWithContent as PostEntity[],
      total: allPosts.length,
    }
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

import {
  Pagination,
  Post,
  PostByType,
  PostStatus,
  PostTypeValue,
  Tag,
} from '@project/shared/types';
import { Entity } from '@project/shared/repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PostEntity } from './post.entity';
import { PostContentRepositoryFactory } from './post.content-repository';
import { TagRepository } from '../tag/tag.repository';
import { TagPostRepository } from '../tag/tag-post.repository';

type PostCommonRecord = Omit<Post, 'content' | 'tags'> & { content: string };

@Injectable()
export class PostRepository  {
  protected readonly memo = new Map<string, PostCommonRecord>();

  constructor(
    private readonly postContentRepositoryFactory: PostContentRepositoryFactory,
    private readonly tagRepository: TagRepository,
    private readonly tagPostRepository: TagPostRepository,
  ) {}

  public async findById(id: string): Promise<PostEntity> {
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
    const tags = (await this.tagRepository.findByIdMany(tagIds.map((item) => item.tagId)))
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
      tags,
    } as PostEntity;
  }

  public async save<T extends PostTypeValue>(entity: Entity<PostByType<T>>) {
    const { tags, content, ...entityToSave } = entity;
    const contentRepository = this.postContentRepositoryFactory.create(entity.type);
    const contentEntity = await contentRepository.save(content);

    if (!contentEntity.id) {
      throw new Error('Error saving the content');
    }

    const postToSave = {
      ...entityToSave,
      id: entity.id ?? randomUUID(),
      content: contentEntity.id,
    };
    const postToReturn = {
      ...postToSave,
      content,
      tags,
    };

    if (tags) {
      await this.saveTags(postToSave.id, tags);
    }

    this.memo.set(postToSave.id, postToSave);

    return postToReturn;
  }

  public async update<T extends PostTypeValue>(id: string, entity: Entity<PostByType<T>>) {
    const post = this.memo.get(id);

    if (!post) {
      throw new NotFoundException(`Post with id "${id}" not found`);
    }

    const contentRepository = this.postContentRepositoryFactory.create(post.type);
    const contentEntity = await contentRepository.findById(post.content);

    if (!contentEntity) {
      throw new NotFoundException(`Post with id ${id} has no content`);
    }

    const updatedContent = await contentRepository.update(
      contentEntity.id,
      { ...contentEntity, ...(entity.content || null) },
    );

    const { id: contentId, ...content } = updatedContent;

    if (entity.tags) {
      await this.deleteTags(id);
      await this.saveTags(id, entity.tags);
    }

    const updatedPost = { ...post, ...entity, content: contentId, id };

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

    const contentRepository = this.postContentRepositoryFactory.create(post.type);
    await contentRepository.deleteById(post.content);
    await this.deleteTags(id);

    this.memo.delete(id);
  }

  public async index({ pageNumber, pageSize }: Required<Pagination>) {
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

  private async deleteTags(postId: string) {
    const tagPostsToDelete = await this.tagPostRepository.findByPost(postId);
    await this.tagPostRepository.deleteByPostId(postId);

    for (const tagPost of tagPostsToDelete) {
      if (!await this.tagPostRepository.findByTag(tagPost.tagId)) {
        this.tagRepository.deleteById(tagPost.id);
      }
    }
  }

  private async saveTags(postId: string, tags: Tag[]) {
    const savedTags = await this.tagRepository.saveMany(tags);
    await this.tagPostRepository.saveMany(
      savedTags.flatMap((tag) => tag.id ? [({ tagId: tag.id, postId })] : []),
    );
  }

  private async getContent(type: PostTypeValue, id: string) {
    const contentRepository = this.postContentRepositoryFactory.create(type);
    return contentRepository.findById(id);
  }
}

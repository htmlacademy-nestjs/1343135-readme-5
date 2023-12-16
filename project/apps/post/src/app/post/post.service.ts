import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Post, PostStatus } from '@project/shared/types';
import { PostCreateRequestDto, PostGetRequestDto, PostGetResponseDto, PostUpdateRequestDto } from './dto';
import { PostEntity, PostEntityFactory } from './post.entity';
import { Entity } from '@project/shared/repository';
import { PostPagination } from './post.const';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postEntityFactory: PostEntityFactory,
  ) {}

  public async getById(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(`Post with id "${id}" not found`);
    }

    return post;
  }

  public async index({
    pageNumber = PostPagination.pageNumber,
    pageSize = PostPagination.pageSize,
  }: PostGetRequestDto): Promise<PostGetResponseDto> {
    const { posts, total } = await this.postRepository.index({ pageNumber, pageSize });

    return {
      posts,
      total,
      pageNumber,
      pageSize,
    };
  }

  public async create(dto: PostCreateRequestDto) {
    const date = new Date().toISOString();
    const populatedDto = {
      ...dto,
      status: PostStatus.Published,
      createdAt: date,
      publishedAt: date,
    };
    const entity = this.postEntityFactory.create(populatedDto.type, populatedDto);
    const saved = await this.postRepository.save(entity);
    return saved;
  }

  public async update(id: string, dto: PostUpdateRequestDto) {
    const updated = await this.postRepository.update(id, dto as unknown as Entity<Post>);
    return updated;
  }

  public async delete(id: string) {
    await this.postRepository.deleteById(id);
  }
}

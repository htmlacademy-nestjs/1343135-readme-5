import { Injectable } from "@nestjs/common";
import { Entity, MemoryRepository } from "@project/shared/repository";

type TagPost = {
  tagId: string;
  postId: string;
}

@Injectable()
export class TagPostRepository extends MemoryRepository<Entity<TagPost>> {
  public async findByPost(postId: string) {
    return [...this.memo.values()].filter((item) => item.postId === postId);
  }

  public async findByTag(tagId: string) {
    return [...this.memo.values()].filter((item) => item.tagId === tagId);
  }

  public async getByTagPost(tagPost: TagPost) {
    return [...this.memo.values()]
      .find(
        (item) => item.postId === tagPost.postId && item.tagId === tagPost.tagId
      );
  }

  public async saveMany(tagPosts: TagPost[]) {
    return Promise.all(tagPosts.map(async (tagPost) => {
      const existing = await this.getByTagPost(tagPost);
      if (existing) {
        return existing;
      }
      return this.save(tagPost);
    }))
  }

  public async updateByPostId(postId: string, tagPosts:  TagPost[]) {
    const toDelete = [...this.memo.values()].filter((item) => item.postId === postId);
    for (const { id } of toDelete) {
      await this.deleteById(id);
    }

    return this.saveMany(tagPosts);
  }

  public async deleteByPostId(postId: string) {
    const toDelete = [...this.memo.values()].filter((item) => item.postId === postId);
    for (const { id } of toDelete) {
      await this.deleteById(id);
    }
  }

  public async findManyByTagId(ids: string[]) {
    const idSet = new Set(ids);

    return [...this.memo.values()].filter((item) => idSet.has(item.tagId));
  }
}

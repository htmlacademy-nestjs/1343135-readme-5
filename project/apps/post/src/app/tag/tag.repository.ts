
import { Injectable } from '@nestjs/common';
import { Entity, MemoryRepository } from "@project/shared/repository";
import { Tag } from "@project/shared/types";

@Injectable()
export class TagRepository extends MemoryRepository<Entity<Tag>> {
  public async findByText(text: Tag['text']) {
    const lowerCaseText = text.toLowerCase();
    return [...this.memo.values()].find((tag) => tag.text === lowerCaseText);
  }

  public async deleteByText(text: Tag['text']) {
    const tag = await this.findByText(text);
    super.deleteById(tag?.id);
  }

  public async save(tag: Entity<Tag>) {
    const normalizedTag = { text: tag.text.toLowerCase() };
    const existing = await this.findByText(normalizedTag.text);

    if (existing) {
      return existing;
    }

    return super.save(normalizedTag);
  }

  public async saveMany(tags: Entity<Tag>[]) {
    const uniqueTags = [
      ...new Set(
        tags.map((tag) => tag.text.toLowerCase())
      )
    ].map((text) => ({ text }));

    return Promise.all(
      uniqueTags.map(async (tag) => await this.save(tag)),
    );
  }

  public async findByIdMany(ids: string[]) {
    return Promise.all(
      ids.map(async (id) => await this.findById(id)),
    );
  }
}

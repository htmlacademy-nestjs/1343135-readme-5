import { Module } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { TagPostRepository } from './tag-post.repository';

@Module({
  providers: [
    TagRepository,
    TagPostRepository,
  ],
  exports: [
    TagRepository,
    TagPostRepository,
  ]
})
export class TagModule {}

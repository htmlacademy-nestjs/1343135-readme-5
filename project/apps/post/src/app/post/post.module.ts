import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostEntityFactory } from './post.entity';
import {
  PostLinkContentRepository,
  PostPhotoContentRepository,
  PostQuoteContentRepository,
  PostTextContentRepository,
  PostVideoContentRepository,
} from './post.content-repository';
import { TagModule } from '../tag/tag.module';


@Module({
  imports: [TagModule],
  providers: [
    PostEntityFactory,
    PostService,
    PostRepository,
    PostVideoContentRepository,
    PostTextContentRepository,
    PostQuoteContentRepository,
    PostPhotoContentRepository,
    PostLinkContentRepository,
  ],
  controllers: [PostController],
})
export class PostModule {}

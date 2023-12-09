import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostLinkContentRepository, PostPhotoContentRepository, PostQuoteContentRepository, PostRepository, PostTextContentRepository, PostVideoContentRepository } from './post.repository';
import { PostEntityFactory } from './post.entity';


@Module({
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

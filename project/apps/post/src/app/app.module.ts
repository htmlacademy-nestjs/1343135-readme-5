import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [PostModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

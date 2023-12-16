import { Injectable } from "@nestjs/common";
import { Entity, MemoryRepository } from "@project/shared/repository";
import {
  PostLinkContent,
  PostPhotoContent,
  PostQuoteContent,
  PostTextContent,
  PostVideoContent,
} from "@project/shared/types";

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

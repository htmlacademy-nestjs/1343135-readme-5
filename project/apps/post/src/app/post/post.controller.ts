import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import {
  PostUpdateRequestDto,
  PostGetByIdRequestDto,
  PostGetRequestDto,
  PostGetResponseDto,
  PostVideoCreateRequestDto,
  PostTextCreateRequestDto,
  PostQuoteCreateRequestDto,
  PostPhotoCreateRequestDto,
  PostLinkCreateRequestDto,
  PostResponseDto,
} from './dto';
import { PostType } from '@project/shared/types';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostLinkResponseDto, PostPhotoResponseDto, PostQuoteResponseDto, PostTextResponseDto, PostVideoResponseDto } from './dto/post.response.dto';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of posts.',
    type: PostGetResponseDto,
  })
  @Get()
  public async index(@Query() dto: PostGetRequestDto) {
    return this.postService.index({
      pageNumber: Number(dto.pageNumber),
      pageSize: Number(dto.pageSize),
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post info by id.',
    type: PostResponseDto,
  })
  @Get('/:id')
  public async get(@Param() dto: PostGetByIdRequestDto) {
    return this.postService.getById(dto.id);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New post is created.',
    type: PostVideoResponseDto,
  })
  @Post(`/${PostType.Video}`)
  public async createVideo(@Body() dto: PostVideoCreateRequestDto) {
    return this.postService.create({ ...dto, type: PostType.Video });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New post is created.',
    type: PostTextResponseDto,
  })
  @Post(`/${PostType.Text}`)
  public async createText(@Body() dto: PostTextCreateRequestDto) {
    return this.postService.create({ ...dto, type: PostType.Text });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New post is created.',
    type: PostQuoteResponseDto,
  })
  @Post(`/${PostType.Quote}`)
  public async createQuote(@Body() dto: PostQuoteCreateRequestDto) {
    return this.postService.create({ ...dto, type: PostType.Quote });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New post is created.',
    type: PostPhotoResponseDto,
  })
  @Post(`/${PostType.Photo}`)
  public async createPhoto(@Body() dto: PostPhotoCreateRequestDto) {
    return this.postService.create({ ...dto, type: PostType.Photo });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New post is created.',
    type: PostLinkResponseDto,
  })
  @Post(`/${PostType.Link}`)
  public async createLink(@Body() dto: PostLinkCreateRequestDto) {
    return this.postService.create({ ...dto, type: PostType.Link });
  }

  @ApiResponse({
    description: 'Post is updated.',
    type: PostResponseDto,
  })
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() dto: PostUpdateRequestDto,
  ) {
    return this.postService.update(id, dto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post is deleted.',
  })
  @Delete('/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}


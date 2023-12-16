import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import {
  PostCreateRequestDto,
  PostUpdateRequestDto,
  PostGetByIdRequestDto,
  PostGetRequestDto,
} from './dto';
import { PostTypeValue } from '@project/shared/types';
import { StatusCodes } from 'http-status-codes';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public async index(@Query() dto: PostGetRequestDto) {
    return this.postService.index({
      pageNumber: Number(dto.pageNumber),
      pageSize: Number(dto.pageSize),
    });
  }

  @Get('/:id')
  public async get(@Param() dto: PostGetByIdRequestDto) {
    return this.postService.getById(dto.id);
  }

  @Post('/:type')
  public async create(@Param('type') type: PostTypeValue, @Body() dto: PostCreateRequestDto) {
    return this.postService.create({ ...dto, type } as PostCreateRequestDto);
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() dto: PostUpdateRequestDto,
  ) {
    return this.postService.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}


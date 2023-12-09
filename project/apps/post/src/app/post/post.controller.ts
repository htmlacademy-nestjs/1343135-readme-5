import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateRequestDto, PostUpdateRequestDto, PostGetByIdRequestDto } from './dto';
import { PostTypeValue } from '@project/shared/types';
import { StatusCodes } from 'http-status-codes';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

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


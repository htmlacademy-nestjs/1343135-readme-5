import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import {
  PostCreateRequestDto,
  PostUpdateRequestDto,
  PostGetByIdRequestDto,
  PostGetRequestDto,
  PostGetResponseDto,
} from './dto';
import { PostTypeValue } from '@project/shared/types';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
    type: PostGetResponseDto,
  })
  @Get('/:id')
  public async get(@Param() dto: PostGetByIdRequestDto) {
    return this.postService.getById(dto.id);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New post is created.',
    type: PostGetResponseDto,
  })
  @Post('/:type')
  public async create(@Param('type') type: PostTypeValue, @Body() dto: PostCreateRequestDto) {
    return this.postService.create({ ...dto, type } as PostCreateRequestDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post is updated.',
    type: PostGetResponseDto,
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


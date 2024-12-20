import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { GetBoardListResponseDto } from './dto/get-baord-list.dto';
import { GetLatestListResponseDto } from './dto/get-latest-list-response.dto';
import { GetPopularListResponseDto } from './dto/get-popular-list.dto';
import { IBoardService } from './interface/board.service.interface';

@Controller('boards')
export class BoardController {
  constructor(
    @Inject(BoardService)
    private readonly boardService: IBoardService,
  ) {}

  @ApiOperation({
    summary: '인기 글 목록 조회',
    description: `
    - 오늘을(00시 ~ 23시 59분) 기준으로 조회 합니다.
    - 각 게시글의 좋아요 수를 수집하여 가장 수가 많은 게시글을 반환 합니다.
    `,
  })
  @ApiQuery({
    name: 'count',
    description: '가져올 게시글 개수',
  })
  @ApiOkResponse({
    type: [GetPopularListResponseDto],
  })
  @Get('popular-lists')
  async getPopularList(@Query() count: number) {}

  @ApiOperation({
    summary: '최신 글 목록 조회',
    description: `
    - 최근에 등록된 게시글을 조회 합니다.`,
  })
  @ApiQuery({
    name: 'count',
    description: '가져올 게시글 개수',
  })
  @ApiOkResponse({
    type: [GetLatestListResponseDto],
  })
  @Get('latest-lists')
  async getLatestList(@Query() count: number) {}

  @ApiOperation({
    summary: '게시글 목록 조회',
    description: `
    - 등록된 게시글을 날짜를 내림차순으로 정렬하여 조회 합니다.
    - 카테고리를 선택할 수 있습니다.`,
  })
  @ApiQuery({
    name: 'category',
    description: `
    - 게시글의 카테고리
    - 기본값 : 전체`,
    required: false,
  })
  @ApiOkResponse({
    type: [GetBoardListResponseDto],
  })
  @Get()
  async getBoardList(@Query() category: string) {}
}

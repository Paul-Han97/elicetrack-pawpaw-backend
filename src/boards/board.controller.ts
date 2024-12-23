import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { BOARD_CATEGORY_TYPE } from 'src/common/constants';
import { BoardService } from './board.service';
import { CreateOneDto, CreateOneResponseDto } from './dto/create-one.dto';
import { GetBoardListResponseDto } from './dto/get-baord-list.dto';
import { GetBoardResponseDto } from './dto/get-board.dto';
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
    - 게시글 등록일자를 기준으로 내림차순 정렬하여 조회 합니다.
    - 카테고리를 선택할 수 있습니다.`,
  })
  @ApiQuery({
    name: 'category',
    enum: BOARD_CATEGORY_TYPE,
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

  @ApiOperation({
    summary: '게시글을 조회 합니다.',
    description: `
    - 게시글 ID를 인자로 받아 게시글의 데이터를 조회 합니다.`,
  })
  @ApiOkResponse({
    type: GetBoardResponseDto,
  })
  @Get(':id')
  async getBoard(@Param() id: number) {}

  @ApiOperation({
    summary: '게시글을 생성 합니다.',
    description: `
    - 게시글을 생성 합니다.
    - 이미지는 최대 10장 업로드 가능합니다.
    - 이미지의 각 파일은 최대 10MB를 넘지 않아야 합니다.
    - 제목은 한글 및 공백 포함 최대 30자까지 허용 합니다.
    - 내용은 최대 1,000Byte까지 허용 합니다.
    `,
  })
  @ApiCreatedResponse({
    type: CreateOneResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imageList'))
  @Post()
  async createOne(
    @UploadedFiles() imageList: Express.Multer.File[],
    @Body() createOneDto: CreateOneDto,
  ) {}

  @ApiOperation({
    summary: '게시글을 수정 합니다.',
    description: `
    - 게시글을 수정 합니다.
    - 이미지는 최대 5장 업로드 가능합니다.
    - 이미지의 각 파일은 최대 10MB 입니다.
    - 제목은 한글 및 공백 포함 최대 30자까지 허용 합니다.
    - 내용은 최대 1,000Byte까지 허용 합니다.
    - 이미 생성된 이미지들은 모두 삭제하고 입력 받은 이미지를 생성 합니다.
    `,
  })
  @ApiParam({
    name: 'id',
    description: '게시글의 ID',
  })
  @Put(':id')
  async updateOne(
    @UploadedFiles() imageList: Express.Multer.File[],
    @Param('id') id: number,
    @Body() updateOneDto: CreateOneDto,
  ) {}

  @ApiOperation({
    summary: '게시글을 삭제 합니다.',
    description: `
    - 게시글을 삭제 합니다.
    - 내역이 남지 않기 때문에 삭제 이후 복구 할 수 없습니다.
    `,
  })
  @ApiParam({
    name: 'id',
    description: '게시글의 ID',
  })
  @ApiOkResponse()
  @Delete(':id')
  async deleteOne(@Param('id') id: number) {}
}

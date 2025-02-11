import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Request } from 'express';
import {
  UpdateBoardCommentDto,
  UpdateBoardcommentResponseDto,
} from 'src/boards/dto/update-board-comment.dto';
import { BOARD_CATEGORY_TYPE } from 'src/common/constants';
import { Auth } from 'src/common/guards/auth.decorator';
import { BoardService } from './board.service';
import {
  CreateBoardCommentDto,
  CreateBoardCommentResponseDto,
} from './dto/create-board-comment.dto';
import { CreateBoardDto, CreateBoardResponseDto } from './dto/create-board.dto';
import { DeleteBoardCommentDto } from './dto/delete-board-comment.dto';
import { DeleteBoardDto } from './dto/delete-board.dto';
import {
  GetBoardListQueryDto,
  GetBoardListResponseDto,
} from './dto/get-board-list.dto';
import { GetBoardDto, GetBoardResponseDto } from './dto/get-board.dto';
import {
  GetLatestListQueryDto,
  GetLatestListResponseDto,
} from './dto/get-latest-list.dto';
import {
  GetPopularListQueryDto,
  GetPopularListResponseDto,
} from './dto/get-popular-list.dto';
import { UpdateBoardDto, UpdateBoardResponseDto } from './dto/update-board.dto';
import { UpdateIsLikeClickedDto } from './dto/update-is-like-clicked.dto';
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
  @ApiOkResponse({
    type: [GetPopularListResponseDto],
  })
  @Get('popular-list')
  async getPopularList(
    @Query() getPopularListQueryDto: GetPopularListQueryDto,
  ) {
    const result = await this.boardService.getPopularList(
      getPopularListQueryDto,
    );

    return result;
  }

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
  @Get('latest-list')
  async getLatestList(@Query() getLatestListQueryDto: GetLatestListQueryDto) {
    const result = await this.boardService.getLatestList(getLatestListQueryDto);

    return result;
  }

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
  async getBoardList(
    @Req() req: Request,
    @Query() getBoardListQueryDto: GetBoardListQueryDto,
  ) {
    const user = req.session.user;
    getBoardListQueryDto.userId = user?.id ?? null;
    const result = await this.boardService.getBoardList(getBoardListQueryDto);

    return result;
  }

  @ApiOperation({
    summary: '게시글을 조회 합니다.',
    description: `
    - 게시글 ID를 인자로 받아 게시글의 데이터를 조회 합니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '게시글의 ID',
  })
  @ApiOkResponse({
    type: GetBoardResponseDto,
  })
  @Get(':id')
  async getBoard(@Req() req: Request, @Param('id') id: number) {
    const user = req.session.user;
    const getBoardDto = new GetBoardDto();
    getBoardDto.id = id;
    getBoardDto.userId = user?.id ?? null;

    const result = await this.boardService.getBoard(getBoardDto);

    return result;
  }

  @ApiOperation({
    summary: '게시글을 생성 합니다.',
    description: `
    - 게시글을 생성 합니다.
    - 이미지는 최대 5장 업로드 가능합니다.
    - 이미지의 각 파일은 최대 10MB를 넘지 않아야 합니다.
    - 제목은 한글 및 공백 포함 최소 1자, 최대 30자까지 허용 합니다.
    - 내용은 최대 1,500Byte까지 허용 합니다.
    `,
  })
  @ApiCreatedResponse({
    type: CreateBoardResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor())
  @Auth()
  @ApiCookieAuth()
  @Post()
  async createBoard(
    @UploadedFiles() imageList: Express.Multer.File[],
    @Req() req: Request,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    const userId = req.session?.user?.id ?? null;
    createBoardDto.imageList = imageList;
    createBoardDto.userId = userId;

    const result = await this.boardService.createBoard(createBoardDto);

    return result;
  }

  @ApiOperation({
    summary: '로그인된 사용자가 해당 게시글의 좋아요 상태를 변경합니다.',
    description: `
    - isLikeClicked를 true로 호출하면 DB에 데이터가 삽입 됩니다.
    - isLikeClicked를 false로 호출하면 DB에 데이터가 제거 됩니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '게시글의 ID',
  })
  @Auth()
  @ApiCookieAuth()
  @Put(':id/isLikeClicked')
  async updateIsLikeClicked(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() updateIsLikeClickedDto: UpdateIsLikeClickedDto,
  ) {
    const user = req.session.user;
    updateIsLikeClickedDto.userId = user.id;
    updateIsLikeClickedDto.id = id;

    const result = await this.boardService.updateIsLikeClicked(
      updateIsLikeClickedDto,
    );

    return result;
  }

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
  @ApiOkResponse({
    type: UpdateBoardResponseDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor())
  @Auth()
  @ApiCookieAuth()
  @Put(':id')
  async updateBoard(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            // 공식 maxSize: 1024 * 1024 * 10 = 10MB
            maxSize: 10_485_760,
          }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    imageList: Express.Multer.File[],
    @Req() req: Request,
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const user = req.session?.user;
    updateBoardDto.id = id;
    updateBoardDto.userId = user?.id ?? null;
    updateBoardDto.imageList = imageList;

    const result = await this.boardService.updateBoard(updateBoardDto);

    return result;
  }

  @ApiOperation({
    summary: '댓글을 작성 합니다.',
    description: `
    - 게시글의 ID를 입력받아 작성 합니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '게시글 ID',
  })
  @Auth()
  @ApiCookieAuth()
  @ApiCreatedResponse({
    type: CreateBoardCommentResponseDto,
  })
  @Post(':id/comments')
  async createBoardComment(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() createBoardCommentDto: CreateBoardCommentDto,
  ) {
    const user = req.session?.user;

    createBoardCommentDto.id = id;
    createBoardCommentDto.userId = user?.id ?? null;

    const result = await this.boardService.createBoardComment(
      createBoardCommentDto,
    );
    return result;
  }

  @ApiOperation({
    summary: '댓글을 수정 합니다.',
    description: `
      - 댓글의 ID를 입력 받아 수정 합니다.
      - 내용을 수정할 수 있습니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '게시글 ID',
  })
  @ApiParam({
    name: 'commentId',
    description: '댓글의 ID',
  })
  @Auth()
  @ApiCookieAuth()
  @ApiOkResponse({
    type: UpdateBoardcommentResponseDto,
  })
  @Put(':id/comments/:commentId')
  async updateBoardComment(
    @Req() req: Request,
    @Param('id') id: number,
    @Param('commentId') commentId: number,
    @Body() updateBoardCommentDto: UpdateBoardCommentDto,
  ) {
    const user = req.session?.user;

    updateBoardCommentDto.id = id;
    updateBoardCommentDto.commentId = commentId;
    updateBoardCommentDto.userId = user?.id ?? null;

    const result = await this.boardService.updateBoardComment(
      updateBoardCommentDto,
    );

    return result;
  }

  @ApiOperation({
    summary: '게시글을 삭제 합니다.',
    description: `
    - 게시글을 삭제 합니다.
    - 내역이 남지 않기 때문에 삭제 이후 복구 할 수 없습니다.
    `,
  })
  @Auth()
  @ApiParam({
    name: 'id',
    description: '게시글의 ID',
  })
  @Delete(':id')
  async deleteBoard(@Req() req: Request, @Param('id') id: number) {
    const user = req.session?.user;
    const deleteBoardDto = new DeleteBoardDto();
    deleteBoardDto.id = id;
    deleteBoardDto.userId = user?.id ?? null;

    const result = await this.boardService.deleteBoard(deleteBoardDto);

    return result;
  }

  @ApiOperation({
    summary: '댓글을 삭제 합니다.',
    description: `
    - 댓글의 ID를 입력 받아 삭제 합니다.
    `,
  })
  @ApiParam({
    name: 'id',
    description: '게시글 ID',
  })
  @ApiParam({
    name: 'commentId',
    description: '댓글의 ID',
  })
  @Auth()
  @ApiCookieAuth()
  @Delete(':id/comments/:commentId')
  async deleteBoardComment(
    @Req() req: Request,
    @Param('id') id: number,
    @Param('commentId') commentId: number,
  ) {
    const user = req.session?.user;

    const deleteBoardCommentDto = new DeleteBoardCommentDto();
    deleteBoardCommentDto.id = id;
    deleteBoardCommentDto.commentId = commentId;
    deleteBoardCommentDto.userId = user?.id ?? null;

    const result = await this.boardService.deleteBoardComment(
      deleteBoardCommentDto,
    );

    return result;
  }
}

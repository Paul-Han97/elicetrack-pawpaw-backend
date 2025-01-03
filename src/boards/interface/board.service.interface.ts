import { ResponseData } from 'src/common/types/response.type';
import {
  CreateBoardDto,
  CreateBoardResponseDto,
} from '../dto/create-board.dto';
import { DeleteBoardDto } from '../dto/delete-board.dto';
import {
  GetBoardListQueryDto,
  GetBoardListResponseDto,
} from '../dto/get-board-list.dto';
import { GetBoardDto, GetBoardResponseDto } from '../dto/get-board.dto';
import {
  GetLatestListQueryDto,
  GetLatestListResponseDto,
} from '../dto/get-latest-list.dto';
import {
  GetPopularListQueryDto,
  GetPopularListResponseDto,
} from '../dto/get-popular-list.dto';
import { UpdateBoardCommentDto } from '../dto/update-board-comment.dto';
import {
  UpdateBoardDto,
  UpdateBoardResponseDto,
} from '../dto/update-board.dto';

export interface IBoardService {
  getPopularList(
    getPopularListQueryDto: GetPopularListQueryDto,
  ): Promise<ResponseData<[GetPopularListResponseDto]>>;

  getLatestList(
    getLatestListQueryDto: GetLatestListQueryDto,
  ): Promise<ResponseData<GetLatestListResponseDto[]>>;

  getBoardList(
    getBoardListQueryDto: GetBoardListQueryDto,
  ): Promise<ResponseData<GetBoardListResponseDto>>;

  getBoard(
    getBoardDto: GetBoardDto,
  ): Promise<ResponseData<GetBoardResponseDto>>;

  createBoard(
    createBoardDto: CreateBoardDto,
  ): Promise<ResponseData<CreateBoardResponseDto>>;

  updateBoard(
    updateBoardDto: UpdateBoardDto,
  ): Promise<ResponseData<UpdateBoardResponseDto>>;

  updateBoardComment(
    updateBoardCommentDto: UpdateBoardCommentDto,
  ): Promise<ResponseData<UpdateBoardResponseDto>>;

  deleteBoard(deleteBoardDto: DeleteBoardDto): Promise<ResponseData>;
}

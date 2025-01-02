import { Inject, Injectable } from '@nestjs/common';
import { SUCCESS_MESSAGE } from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { BoardRepository } from './board.repository';
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
import { IBoardRepository } from './interface/board.repository.interface';
import { IBoardService } from './interface/board.service.interface';

@Injectable()
export class BoardService implements IBoardService {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
  ) {}

  async getBoard(
    getBoardDto: GetBoardDto,
  ): Promise<ResponseData<GetBoardResponseDto>> {
    const { userId } = getBoardDto;

    const result = await this.boardRepository.findBoard(getBoardDto);

    const getBoardResponseDto = new GetBoardResponseDto();
    getBoardResponseDto.nickname = result.user.nickname;
    getBoardResponseDto.title = result.title;
    getBoardResponseDto.content = result.content;
    getBoardResponseDto.likeCount = result.userBoardLike.length;
    getBoardResponseDto.author.id = result.user.id;
    getBoardResponseDto.isLikeClicked =
      result.userBoardLike.filter(
        (userBoardLike) => userBoardLike.user.id === userId,
      ).length > 0;
    getBoardResponseDto.author.nickname = result.user.nickname;
    getBoardResponseDto.createdAt = result.createdAt;
    getBoardResponseDto.likeCount = result.userBoardLike.length;

    for (const boardImage of result.boardImage) {
      getBoardResponseDto.imageList.push({
        isPrimary: boardImage.isPrimary,
        url: boardImage.image.url,
      });
    }

    for (const comment of result.comment) {
      getBoardResponseDto.commentList.push({
        id: comment.id,
        createdAt: comment.createdAt,
        nickname: comment.user.nickname,
        content: comment.content,
        imageUrl: comment.user?.userImage[0]?.image?.url ?? null,
      });
    }

    const resData: ResponseData<GetBoardResponseDto> = {
      message: SUCCESS_MESSAGE.FIND,
      data: getBoardResponseDto,
    };

    return resData;
  }

  async getBoardList(
    getBoardListQueryDto: GetBoardListQueryDto,
  ): Promise<ResponseData<GetBoardListResponseDto>> {
    const result =
      await this.boardRepository.findBoardList(getBoardListQueryDto);

    const resData: ResponseData<GetBoardListResponseDto> = {
      message: SUCCESS_MESSAGE.FIND,
      data: result,
    };

    return resData;
  }

  async getLatestList(
    getLatestListQueryDto: GetLatestListQueryDto,
  ): Promise<ResponseData<GetLatestListResponseDto[]>> {
    const { count } = getLatestListQueryDto;

    const result = await this.boardRepository.findLatestList(count);

    const resData: ResponseData<GetLatestListResponseDto[]> = {
      message: SUCCESS_MESSAGE.FIND,
      data: result,
    };
    return resData;
  }

  async getPopularList(
    getPopularListQueryDto: GetPopularListQueryDto,
  ): Promise<ResponseData<[GetPopularListResponseDto]>> {
    const { count } = getPopularListQueryDto;
    const result = await this.boardRepository.findPopularList(count);

    const resData: ResponseData<[GetPopularListResponseDto]> = {
      message: SUCCESS_MESSAGE.FIND,
      data: result,
    };

    return resData;
  }
}

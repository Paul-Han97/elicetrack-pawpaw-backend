import { Inject, Injectable } from '@nestjs/common';
import { SUCCESS_MESSAGE } from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { BoardRepository } from './board.repository';
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

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
import { GetLatestListQueryDto, GetLatestListResponseDto } from './dto/get-latest-list.dto';

@Injectable()
export class BoardService implements IBoardService {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
  ) {}

  async getLatestList(getLatestListQueryDto: GetLatestListQueryDto): Promise<ResponseData<GetLatestListResponseDto[]>> {
    const { count } = getLatestListQueryDto;

    const result = await this.boardRepository.findLatestList(count);

    const resData:ResponseData<GetLatestListResponseDto[]> = {
      message: SUCCESS_MESSAGE.FIND,
      data: result
    }
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

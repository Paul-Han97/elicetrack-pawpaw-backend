import { Inject, Injectable } from '@nestjs/common';
import { BOARD_CATEGORY_TYPE, BOARD_CATEGORY_TYPE_INDEX, SUCCESS_MESSAGE } from 'src/common/constants';
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
import { CreateBoardDto, CreateBoardResponseDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { BoardCategory } from 'src/board-categories/entities/board-category.entity';
import { ImageService } from 'src/images/image.service';
import { IImageService } from 'src/images/interface/image.service.interface';
import { ImageRepository } from 'src/images/image.repository';
import { IImageRepository } from 'src/images/interface/image.repository.interface';
import { BoardImageRepository } from 'src/board-images/board-image.repository';
import { IBoardImageRepository } from 'src/board-images/interface/board-image.repository.interface';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource, EntityManager, getManager } from 'typeorm';
import { UploadImageDto } from 'src/images/dto/upload-image.dto';
import { DeleteImageDto } from 'src/images/dto/delete-image.dto';

@Injectable()
export class BoardService implements IBoardService {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,

    @Inject(ImageService)
    private readonly imageService: IImageService,

    @Inject(ImageRepository)
    private readonly imageRepository: IImageRepository,

    @Inject(BoardImageRepository)
    private readonly boardImageRepository: IBoardImageRepository,

    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,

  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<ResponseData<CreateBoardResponseDto>> {
    const { category, content, imageList, title, userId } = createBoardDto;

    const boardCategory = new BoardCategory();
    boardCategory.id = BOARD_CATEGORY_TYPE_INDEX[category];

    const board = new Board();
    board.title = title;
    board.content = content;
    board.boardCategory = boardCategory;
    board.createdUser = userId.toString();

    await this.dataSource.transaction(async (manager: EntityManager) => {
      const boardRepository = manager.withRepository(this.boardRepository);
      const imageRepository = manager.withRepository(this.imageRepository);
      const boardImageRepository = manager.withRepository(this.boardImageRepository);

      const savedBoard = await boardRepository.save(board);

      const uploadImageDto = new UploadImageDto();
      uploadImageDto.entity.id = savedBoard.id;
      uploadImageDto.entity.name = Board.name;

      const tempDeleteImageDto = new DeleteImageDto();

      for(const image of imageList) {
        uploadImageDto.imageList.push(image);
      }

      const uploadedImage = await this.imageService.uploadImageToS3(uploadImageDto);
      for(const filename of uploadedImage.imageList) {
        tempDeleteImageDto.filenameList.push(filename.filename)
      }

      return null;
    })
    
    const createBoardResponseDto = new CreateBoardResponseDto();
    createBoardResponseDto.id = 1;

    const resData: ResponseData<CreateBoardResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: createBoardResponseDto,
    }
    return resData;
  }

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

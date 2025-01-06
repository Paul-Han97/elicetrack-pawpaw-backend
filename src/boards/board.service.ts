import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { BoardCategory } from 'src/board-categories/entities/board-category.entity';
import { BoardImageRepository } from 'src/board-images/board-image.repository';
import { BoardImage } from 'src/board-images/entities/board-image.entity';
import { IBoardImageRepository } from 'src/board-images/interface/board-image.repository.interface';
import { CommentRepository } from 'src/comments/comment.repository';
import { Comment } from 'src/comments/entities/comment.entity';
import { ICommentRepository } from 'src/comments/interface/comment.repository.interface';
import {
  BOARD_CATEGORY_TYPE_INDEX,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { DeleteImageDto } from 'src/images/dto/delete-image.dto';
import { UploadImageDto } from 'src/images/dto/upload-image.dto';
import { Image } from 'src/images/entities/image.entity';
import { ImageRepository } from 'src/images/image.repository';
import { ImageService } from 'src/images/image.service';
import { IImageRepository } from 'src/images/interface/image.repository.interface';
import { IImageService } from 'src/images/interface/image.service.interface';
import { UserBoardLike } from 'src/user-board-likes/entities/user-board-like.entity';
import { IUserBoardLikeRepository } from 'src/user-board-likes/interface/user-board-like.repository.interface';
import { UserBoardLikeRepository } from 'src/user-board-likes/user-board-like.repository';
import { User } from 'src/users/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { BoardRepository } from './board.repository';
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
import {
  UpdateBoardCommentDto,
  UpdateBoardcommentResponseDto,
} from './dto/update-board-comment.dto';
import { UpdateBoardDto, UpdateBoardResponseDto } from './dto/update-board.dto';
import { UpdateIsLikeClickedDto } from './dto/update-is-like-clicked.dto';
import { Board } from './entities/board.entity';
import { IBoardRepository } from './interface/board.repository.interface';
import { IBoardService } from './interface/board.service.interface';

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

    @Inject(CommentRepository)
    private readonly commentRepository: ICommentRepository,

    @Inject(UserBoardLikeRepository)
    private readonly userBoardLikeRepository: IUserBoardLikeRepository,

    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,
  ) {}

  async createBoard(
    createBoardDto: CreateBoardDto,
  ): Promise<ResponseData<CreateBoardResponseDto>> {
    const { category, content, imageList, title, userId } = createBoardDto;

    const uploadImageDto = new UploadImageDto();
    const tempDeleteImageDto = new DeleteImageDto();
    let id = 0;

    try {
      id = await this.dataSource.transaction<number>(
        async (manager: EntityManager): Promise<number> => {
          const boardRepository = manager.withRepository(this.boardRepository);
          const imageRepository = manager.withRepository(this.imageRepository);
          const boardImageRepository = manager.withRepository(
            this.boardImageRepository,
          );

          const user = new User();
          user.id = userId;

          const boardCategory = new BoardCategory();
          boardCategory.id = BOARD_CATEGORY_TYPE_INDEX[category];

          const newBoard = new Board();
          newBoard.title = title;
          newBoard.content = content;
          newBoard.boardCategory = boardCategory;
          newBoard.user = user;
          newBoard.createdUser = userId.toString();

          const board = await boardRepository.save(newBoard);

          if (imageList.length === 0) {
            return;
          }

          uploadImageDto.entity.id = board.id;
          uploadImageDto.entity.name = Board.name;
          uploadImageDto.imageList = imageList;

          const uploadedImageList =
            await this.imageService.uploadImageToS3(uploadImageDto);

          let isFirstImage = true;

          for (const image of uploadedImageList.imageList) {
            tempDeleteImageDto.filenameList.push(image.filename);

            const newImage = new Image();
            newImage.url = image.url;
            newImage.createdUser = userId.toString();

            const newBoardImage = new BoardImage();
            newBoardImage.image = newImage;
            newBoardImage.board = board;
            newBoardImage.createdUser = userId.toString();
            newBoardImage.isPrimary = false;

            if (isFirstImage) {
              newBoardImage.isPrimary = true;
              isFirstImage = false;
            }

            await imageRepository.save(newImage);
            await boardImageRepository.save(newBoardImage);
          }

          return board.id;
        },
      );
    } catch (e) {
      if (tempDeleteImageDto.filenameList.length > 0) {
        await this.imageService.deleteImageFromS3(tempDeleteImageDto);
      }
      throw e;
    }

    const createBoardResponseDto = new CreateBoardResponseDto();
    createBoardResponseDto.id = id;

    const resData: ResponseData<CreateBoardResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: createBoardResponseDto,
    };
    return resData;
  }

  async createBoardComment(
    createBoardCommentDto: CreateBoardCommentDto,
  ): Promise<ResponseData<CreateBoardCommentResponseDto>> {
    const { id, userId, content } = createBoardCommentDto;

    const boardComment = await this.boardRepository.findBoard(id);

    if (!boardComment) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const user = new User();
    user.id = userId;

    const comment = new Comment();
    comment.board = boardComment;
    comment.createdUser = userId.toString();
    comment.content = content;
    comment.user = user;

    await this.commentRepository.save(comment, { reload: false });

    const createBoardCommentResponseDto = new CreateBoardCommentResponseDto();
    createBoardCommentResponseDto.id = boardComment.id;

    const resData: ResponseData<CreateBoardCommentResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: createBoardCommentResponseDto,
    };

    return resData;
  }

  async getBoard(
    getBoardDto: GetBoardDto,
  ): Promise<ResponseData<GetBoardResponseDto>> {
    const { id, userId } = getBoardDto;

    const result = await this.boardRepository.findBoard(id);

    const getBoardResponseDto = new GetBoardResponseDto();
    getBoardResponseDto.nickname = result.user.nickname;
    getBoardResponseDto.title = result.title;
    getBoardResponseDto.content = result.content;
    getBoardResponseDto.likeCount = result.userBoardLike.length;
    getBoardResponseDto.isLikeClicked =
      result.userBoardLike.filter(
        (userBoardLike) => userBoardLike.user.id === userId,
      ).length > 0;
    getBoardResponseDto.author = {
      id: result.user.id,
      nickname: result.user.nickname,
      imageUrl: result.user.userImage?.[0]?.image?.url ?? null,
    };
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
        author: {
          id: comment.user.id,
          nickname: comment.user.nickname,
          imageUrl: comment.user?.userImage?.[0]?.image?.url ?? null,
        },
        content: comment.content,
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

  async updateBoard(
    updateBoardDto: UpdateBoardDto,
  ): Promise<ResponseData<UpdateBoardResponseDto>> {
    const { id, userId, category, content, imageList, title } = updateBoardDto;

    const uploadImageDto = new UploadImageDto();
    const tempDeleteImageDto = new DeleteImageDto();
    let updatedId = id;
    try {
      updatedId = await this.dataSource.transaction<number>(
        async (manager: EntityManager): Promise<number> => {
          const boardRepository = manager.withRepository(this.boardRepository);
          const imageRepository = manager.withRepository(this.imageRepository);
          const boardImageRepository = manager.withRepository(
            this.boardImageRepository,
          );

          const createdBoard = await boardRepository.findBoard(id, userId);

          if (!createdBoard) {
            throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
          }

          createdBoard.title = title;
          createdBoard.boardCategory.id = BOARD_CATEGORY_TYPE_INDEX[category];
          createdBoard.content = content;
          createdBoard.updatedUser = userId.toString();

          await boardRepository.save(createdBoard);

          const deleteImageDto = new DeleteImageDto();
          deleteImageDto.filenameList = createdBoard?.boardImage.map(
            (boardImage) => boardImage.image.url,
          );
          await manager.query(
            `
            DELETE A, B
            FROM board_image A
            JOIN image B ON A.imageId = B.id
            WHERE A.boardId = ?`,
            [Number(id)],
          );

          await this.imageService.deleteImageFromS3(deleteImageDto);

          if (imageList.length === 0) {
            return createdBoard.id;
          }

          uploadImageDto.entity.id = createdBoard.id;
          uploadImageDto.entity.name = Board.name;
          uploadImageDto.imageList = imageList;

          const uploadedImageList =
            await this.imageService.uploadImageToS3(uploadImageDto);

          let isFirstImage = true;

          for (const image of uploadedImageList.imageList) {
            tempDeleteImageDto.filenameList.push(image.filename);

            const newImage = new Image();
            newImage.url = image.url;
            newImage.createdUser = userId.toString();

            const newBoardImage = new BoardImage();
            newBoardImage.image = newImage;
            newBoardImage.board = createdBoard;
            newBoardImage.createdUser = userId.toString();
            newBoardImage.isPrimary = false;

            if (isFirstImage) {
              newBoardImage.isPrimary = true;
              isFirstImage = false;
            }

            await imageRepository.save(newImage);
            await boardImageRepository.save(newBoardImage);
          }

          return createdBoard.id;
        },
      );
    } catch (e) {
      if (tempDeleteImageDto.filenameList.length > 0) {
        await this.imageService.deleteImageFromS3(tempDeleteImageDto);
      }
      throw e;
    }

    const updateBoardResponseDto = new UpdateBoardResponseDto();
    updateBoardResponseDto.id = updatedId;

    const resData: ResponseData<UpdateBoardResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: updateBoardResponseDto,
    };
    return resData;
  }

  async updateIsLikeClicked(
    updateIsLikeClickedDto: UpdateIsLikeClickedDto,
  ): Promise<ResponseData> {
    const { id, isLikeClicked, userId } = updateIsLikeClickedDto;

    const board = await this.boardRepository.findBoard(id);

    if (!board) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const userBoardLikeList = board.userBoardLike.filter(
      (userBoardLike) => userBoardLike.user.id === userId,
    );

    if (isLikeClicked && userBoardLikeList.length === 0) {
      const user = new User();
      user.id = userId;

      const userBoardLike = new UserBoardLike();
      userBoardLike.board = board;
      userBoardLike.createdUser = userId.toString();
      userBoardLike.user = user;
      userBoardLike.isLikeClicked = isLikeClicked;

      await this.userBoardLikeRepository.save(userBoardLike);
    }

    if (!isLikeClicked && userBoardLikeList.length === 1) {
      await this.userBoardLikeRepository.remove(userBoardLikeList[0]);
    }

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };
    return resData;
  }

  async updateBoardComment(
    updateBoardCommentDto: UpdateBoardCommentDto,
  ): Promise<ResponseData<UpdateBoardResponseDto>> {
    const { id, commentId, content, userId } = updateBoardCommentDto;

    const boardComment = await this.boardRepository.findBoardComment(
      id,
      commentId,
      userId,
    );

    if (!boardComment) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const comment = boardComment.comment[0];

    comment.updatedUser = userId.toString();
    comment.content = content;

    await this.commentRepository.save(comment);

    const updateBoardCommentResponseDto = new UpdateBoardcommentResponseDto();
    updateBoardCommentResponseDto.id = comment.id;

    const resData: ResponseData<UpdateBoardResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: updateBoardCommentResponseDto,
    };
    return resData;
  }

  async deleteBoard(deleteBoardDto: DeleteBoardDto): Promise<ResponseData> {
    const { id, userId } = deleteBoardDto;

    const board = await this.boardRepository.findBoard(id, userId);

    if (!board) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const deleteImageDto = new DeleteImageDto();
    deleteImageDto.filenameList = board?.boardImage.map(
      (boardImage) => boardImage.image.url,
    );

    await this.dataSource.transaction(async (manager: EntityManager) => {
      const boardRepository = manager.withRepository(this.boardRepository);
      this.imageService.deleteImageFromS3(deleteImageDto);

      await boardRepository.query(
        `
        DELETE A, B
        FROM board_image A
        JOIN image B ON A.imageId = B.id
        WHERE A.boardId = ?`,
        [Number(id)],
      );

      await boardRepository.remove(board);
    });

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };
    return resData;
  }

  async deleteBoardComment(
    deleteBoardCommentDto: DeleteBoardCommentDto,
  ): Promise<ResponseData> {
    const { id, userId, commentId } = deleteBoardCommentDto;

    const boardComment = await this.boardRepository.findBoardComment(
      id,
      commentId,
      userId,
    );

    if (!boardComment) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const comment = boardComment.comment;

    await this.commentRepository.remove(comment);

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };

    return resData;
  }
}

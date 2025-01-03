import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { BoardRepository } from 'src/boards/board.repository';
import { IBoardRepository } from 'src/boards/interface/board.repository.interface';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from 'src/common/constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseData } from 'src/common/types/response.type';
import { Location } from 'src/locations/entities/location.entity';
import { IReviewRepository } from 'src/reviews/interfaces/review.repository.interface';
import { ReviewRepository } from 'src/reviews/review.repository';
import { UserLocation } from 'src/user-locations/entities/user-location.entity';
import { DataSource, EntityManager } from 'typeorm';
import { DuplicateEmailQueryDto } from './dto/duplicate-email.dto';
import { DuplicateNicknameQueryDto } from './dto/duplicate-nickname.dto';
import { GetMyBoardListResponseDto } from './dto/get-my-board-list.dto';
import { GetMyReviewListDto } from './dto/get-my-review-list.dto';
import {
  GetNearbyUserListQueryDto,
  GetNearbyUserListResponseDto,
  SaveUserLocationDto,
} from './dto/get-nearby-user-list.dto';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';
import { IUserService } from './interfaces/user.service.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(ReviewRepository)
    private readonly reviewRepository: IReviewRepository,
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,
    // @Inject(LocationRepository)
    // private readonly locationRepository: ILocationRepository,
    // @Inject(UserLocationRepository)
    // private readonly userLocationRepository: IUserLocationRepository,
  ) {}

  async checkDuplicateEmail(
    duplicateEmailQueryDto: DuplicateEmailQueryDto,
  ): Promise<ResponseData> {
    const { email } = duplicateEmailQueryDto;
    const user = await this.userRepository.findUserCredentialByEmail(email);

    if (user) {
      throw new BadRequestException(ERROR_MESSAGE.ACCOUNT_ALREADY_EXIST);
    }

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };

    return resData;
  }

  async checkDuplicateNickname(
    duplicateNicknameQueryDto: DuplicateNicknameQueryDto,
  ): Promise<ResponseData> {
    const user = await this.userRepository.findByNickName(
      duplicateNicknameQueryDto,
    );

    if (user) {
      throw new BadRequestException(ERROR_MESSAGE.NICKNAME_ALREADY_EXIST);
    }

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };

    return resData;
  }

  async getMyReviewList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<
    ResponseData<{ reviews: GetMyReviewListDto[]; nextCursor: number | null }>
  > {
    const [reviews] = await this.reviewRepository.findMyReviewList(
      userId,
      paginationDto,
    );

    if (reviews.length === 0) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const nextCursor =
      reviews.length === paginationDto.take
        ? reviews[reviews.length - 1].id
        : null;

    return {
      message: SUCCESS_MESSAGE.REQUEST,
      data: {
        reviews: reviews.map((review) => ({
          reviewId: review.id,
          placeId: review.place.id,
          title: review.title,
          content: review.content,
          isLikeClicked: review.reviewPlaceLike.some(
            (like) => like.review === review,
          ),
        })),
        nextCursor,
      },
    };
  }

  async getMyBoardList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<
    ResponseData<{
      boards: GetMyBoardListResponseDto[];
      nextCursor: number | null;
    }>
  > {
    const [boards] = await this.boardRepository.findMyBoardList(
      userId,
      paginationDto,
    );

    if (boards.length === 0) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }
    const nextCursor =
      boards.length === paginationDto.take
        ? boards[boards.length - 1].id
        : null;

    return {
      message: SUCCESS_MESSAGE.REQUEST,
      data: {
        boards: boards.map((board) => ({
          boardId: board.id ?? null,
          title: board.title ?? null,
          content: board.content ?? null,
          boardCategory: board.boardCategory?.korName ?? null,
          createdAt: board.createdAt ?? null,
          imageList: board.boardImage.map((image) => ({
            isPrimary: image.isPrimary ?? null,
            url: image.image?.url ?? null,
          })),
          isLikeClicked: board.userBoardLike.some((like) => like.isLikeClicked),
        })),
        nextCursor,
      },
    };
  }

  /*
    1. user info에서 walkmate = true
    2. 프론트한테 location을 받고 location table의 ponit 컬럼에 저장을 한다
    3. 저장한 location.id를 UserLocation table에 location.id 컬럼에 박는다
    4. 클라이언트가 반경으로 서치를 하면 해당 radius에 맞는 user.id(user.nickname)을 반환
    5. UserLocation table에 user.id컬럼도 필요함

  */

  async saveUserLocation(
    saveUserLocationDto: SaveUserLocationDto,
  ): Promise<ResponseData> {
    const { id, latitude, longitude } = saveUserLocationDto;

    try {
      await this.dataSource.transaction(
        async (manager: EntityManager): Promise<void> => {
          const userRepository = manager.getRepository(User);
          const locationRepository = manager.getRepository(Location);
          const userLocationRepository = manager.getRepository(UserLocation);

          const user = await userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .andWhere('user.canWalkingMate = true')
            .getOne();

          if (!user) {
            throw new BadRequestException(ERROR_MESSAGE.NOT_VALID_REQUEST);
          }

          const location = new Location();
          location.point = `POINT(${longitude} ${latitude})`;

          const savedLocation = await locationRepository.save(location);

          const existingUserLocation = await userLocationRepository
            .createQueryBuilder('userLocation')
            .leftJoinAndSelect('userLocation.user', 'user')
            .leftJoinAndSelect('userLocation.location', 'location')
            .where('user.id = :id', { id })
            .getOne();

          if (existingUserLocation) {
            existingUserLocation.location = savedLocation;
            existingUserLocation.user = user;
            await userLocationRepository.save(existingUserLocation, {
              reload: false,
            });
          } else {
            const newUserLocation = new UserLocation();
            newUserLocation.user = user;
            newUserLocation.location = savedLocation;
            await userLocationRepository.save(newUserLocation, {
              reload: false,
            });
          }
        },
      );

      const resData: ResponseData = {
        message: SUCCESS_MESSAGE.REQUEST,
        data: null,
      };

      return resData;
    } catch (e) {
      throw e;
    }
  }

  async getNearbyUsers(
    getNearbyUserListQueryDto: GetNearbyUserListQueryDto,
  ): Promise<ResponseData<GetNearbyUserListResponseDto[]>> {
    const { longitude, latitude, radius } = getNearbyUserListQueryDto;

    const users = await this.userRepository.findNearbyUsers(
      longitude,
      latitude,
      radius,
    );

    if (!users.length) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const resData: ResponseData<GetNearbyUserListResponseDto[]> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: users.map((user) => {
        return {
          id: user.id,
          nickname: user.nickname,
        };
      }),
    };

    return resData;
  }
}

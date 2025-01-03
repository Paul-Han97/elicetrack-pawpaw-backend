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
import { ILocationRepository } from 'src/locations/interface/location.repository.interface';
import { LocationRepository } from 'src/locations/location.repository';
import { IReviewRepository } from 'src/reviews/interfaces/review.repository.interface';
import { ReviewRepository } from 'src/reviews/review.repository';
import { UserLocation } from 'src/user-locations/entities/user-location.entity';
import { IUserLocationRepository } from 'src/user-locations/interface/user-location.repository.interface';
import { UserLocationRepository } from 'src/user-locations/user-location.repository';
import { DataSource, EntityManager } from 'typeorm';
import { DuplicateEmailQueryDto } from './dto/duplicate-email.dto';
import { DuplicateNicknameQueryDto } from './dto/duplicate-nickname.dto';
import { GetMyBoardListResponseDto } from './dto/get-my-board-list.dto';
import { GetMyPageResponseDto } from './dto/get-my-page.dto';
import { GetMyReviewListDto } from './dto/get-my-review-list.dto';
import {
  GetNearbyUserListQueryDto,
  GetNearbyUserListResponseDto,
  SaveUserLocationDto,
} from './dto/get-nearby-user-list.dto';
import { GetUserDto, GetUserResponseDto } from './dto/get-user.dto';
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
    @Inject(LocationRepository)
    private readonly locationRepository: ILocationRepository,
    @Inject(UserLocationRepository)
    private readonly userLocationRepository: IUserLocationRepository,
  ) {}

  async getUser(
    getUserDto: GetUserDto,
  ): Promise<ResponseData<GetUserResponseDto>> {
    const { id } = getUserDto;

    const result = await this.userRepository.findUser(id);

    const getUserResponseDto = new GetUserResponseDto();
    getUserResponseDto.email = result.credential[0].username;
    getUserResponseDto.imageUrl = result?.userImage[0]?.image?.url ?? null;
    getUserResponseDto.nickname = result.nickname;

    const resData: ResponseData<GetUserResponseDto> = {
      message: SUCCESS_MESSAGE.FIND,
      data: getUserResponseDto,
    };

    return resData;
  }

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

  async saveUserLocation(
    saveUserLocationDto: SaveUserLocationDto,
  ): Promise<ResponseData> {
    const { id, latitude, longitude } = saveUserLocationDto;

    try {
      await this.dataSource.transaction(
        async (manager: EntityManager): Promise<void> => {
          const userRepository = manager.withRepository(this.userRepository);
          const locationRepository = manager.withRepository(
            this.locationRepository,
          );
          const userLocationRepository = manager.withRepository(
            this.userLocationRepository,
          );

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

  async getMyPage(id: number): Promise<ResponseData<GetMyPageResponseDto>> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userImage', 'userImage')
      .leftJoinAndSelect('userImage.image', 'image')
      .leftJoinAndSelect('user.pet', 'pet')
      .leftJoinAndSelect('pet.gender', 'gender')
      .leftJoinAndSelect('pet.petSize', 'petSize')
      .leftJoinAndSelect('pet.petImage', 'petImage')
      .leftJoinAndSelect('petImage.image', 'images')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const resData: ResponseData<GetMyPageResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: {
        nickname: user.nickname ?? null,
        canWalkingMate: user.canWalkingMate ?? null,
        imageUrl: user.userImage?.[0]?.image?.url ?? null,
        petList: user.pet.map((pet) => ({
          id: pet.id ?? null,
          name: pet.name ?? null,
          age: pet.age ?? null,
          description: pet.description ?? null,
          gender: pet.gender?.type ?? null,
          size: pet.petSize?.type ?? null,
          imageUrl: pet.petImage?.[0]?.image?.url || null,
        })),
      },
    };

    return resData;
  }
}

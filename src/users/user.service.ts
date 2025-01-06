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
import { UtilService } from 'src/common/utils/util.service';
import { CredentialRepository } from 'src/credentials/credential.repository';
import { ICredentialRepository } from 'src/credentials/interfaces/credential.repository.interface';
import { DeleteImageDto } from 'src/images/dto/delete-image.dto';
import { UploadImageDto } from 'src/images/dto/upload-image.dto';
import { Image } from 'src/images/entities/image.entity';
import { ImageRepository } from 'src/images/image.repository';
import { ImageService } from 'src/images/image.service';
import { IImageRepository } from 'src/images/interface/image.repository.interface';
import { IImageService } from 'src/images/interface/image.service.interface';
import { Location } from 'src/locations/entities/location.entity';
import { ILocationRepository } from 'src/locations/interface/location.repository.interface';
import { LocationRepository } from 'src/locations/location.repository';
import { IReviewRepository } from 'src/reviews/interfaces/review.repository.interface';
import { ReviewRepository } from 'src/reviews/review.repository';
import { UserImage } from 'src/user-images/entities/user-image.entity';
import { IUserImageRepository } from 'src/user-images/interface/user-image.repository.interface';
import { UserImageRepository } from 'src/user-images/user-image.repository';
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
import { UpdateUserDto, UpdateUserResponseDto } from './dto/update-user.dto';
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
    @Inject(ImageService)
    private readonly imageService: IImageService,
    @Inject(ImageRepository)
    private readonly imageRepository: IImageRepository,
    @Inject(UserImageRepository)
    private readonly userImageRepository: IUserImageRepository,
    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,
    @Inject(LocationRepository)
    private readonly locationRepository: ILocationRepository,
    @Inject(UserLocationRepository)
    private readonly userLocationRepository: IUserLocationRepository,
    @Inject(UtilService)
    private readonly utilService: UtilService,
    @Inject(CredentialRepository)
    private readonly credentialRepository: ICredentialRepository,
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
          placeName: review.place.name,
          title: review.title,
          content: review.content,
          isLikeClicked: review.reviewPlaceLike.some(
            (like) => like.isLikeClicked,
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
          imageUrl: pet.petImage?.[0]?.image?.url ?? null,
        })),
      },
    };

    return resData;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseData<UpdateUserResponseDto>> {
    const { image, canWalkingMate, nickname, password, newPassword } =
      updateUserDto;
    const id = updateUserDto.id;
    const tempDeleteImageDto = new DeleteImageDto();

    try {
      const result = await this.dataSource.transaction<UpdateUserResponseDto>(
        async (manager: EntityManager): Promise<UpdateUserResponseDto> => {
          const userRepository = manager.withRepository(this.userRepository);
          const imageRepository = manager.withRepository(this.imageRepository);
          const userImageRepository = manager.withRepository(
            this.userImageRepository,
          );
          const credentialRepository = manager.withRepository(
            this.credentialRepository,
          );

          const user = await userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.userImage', 'userImage')
            .leftJoinAndSelect('user.credential', 'credential')
            .leftJoinAndSelect('userImage.image', 'image')
            .where('user.id = :id', { id })
            .getOne();

          if (!user) {
            throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
          }

          user.nickname = nickname || user.nickname;
          user.canWalkingMate = canWalkingMate;

          if (password && newPassword) {
            const isPasswordValid =
              await this.utilService.passwordManager.compare(
                password,
                user.credential[0].password,
              );

            if (!isPasswordValid) {
              throw new BadRequestException(
                ERROR_MESSAGE.EMAIL_PASSWORD_NOT_MATCH,
              );
            }

            const hashedPassword =
              await this.utilService.passwordManager.hash(newPassword);
            user.credential[0].password = hashedPassword;

            await credentialRepository.save(user.credential[0]);
          }

          const updateUserResponseDto = new UpdateUserResponseDto();
          updateUserResponseDto.id = user.id;

          const savedUser = await userRepository.save(user);

          if (!image) {
            const images = user.userImage;
            tempDeleteImageDto.filenameList = images
              .filter((userImage) => userImage?.image?.url)
              .map((userImage) => userImage.image.url.split('/').pop() || '');

            if (tempDeleteImageDto.filenameList.length > 0) {
              await this.imageService.deleteImageFromS3(tempDeleteImageDto);

              for (const userImage of images) {
                await userImageRepository.remove(userImage);
                if (userImage.image) {
                  await imageRepository.remove(userImage.image);
                }
              }
            }
          } else {
            const images = user.userImage || [];
            tempDeleteImageDto.filenameList = images
              .filter((userImage) => userImage?.image?.url)
              .map((userImage) => userImage.image.url.split('/').pop() || '');

            if (tempDeleteImageDto.filenameList.length > 0) {
              await this.imageService.deleteImageFromS3(tempDeleteImageDto);

              for (const userImage of images) {
                await userImageRepository.remove(userImage);
                if (userImage.image) {
                  await imageRepository.remove(userImage.image);
                }
              }
            }

            const uploadImageDto = new UploadImageDto();
            uploadImageDto.entity.id = user.id;
            uploadImageDto.entity.name = User.name;
            uploadImageDto.imageList.push(image);

            const uploadedImage =
              await this.imageService.uploadImageToS3(uploadImageDto);
            tempDeleteImageDto.filenameList.push(
              uploadedImage.imageList[0].filename,
            );

            const newImage = new Image();
            newImage.url = uploadedImage.imageList[0].url;
            newImage.createdUser = user.id.toString();
            newImage.updatedUser = user.id.toString();

            const userImage = new UserImage();
            userImage.user = user;
            userImage.image = newImage;
            userImage.createdUser = user.id.toString();
            userImage.updatedUser = user.id.toString();

            await imageRepository.save(newImage);
            await userImageRepository.save(userImage);
          }

          return {
            id: savedUser.id,
          };
        },
      );

      return {
        message: SUCCESS_MESSAGE.REQUEST,
        data: result,
      };
    } catch (e) {
      if (tempDeleteImageDto.filenameList.length > 0) {
        await this.imageService.deleteImageFromS3(tempDeleteImageDto);
      }
      throw e;
    }
  }
}

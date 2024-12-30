import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getDataSourceToken } from '@nestjs/typeorm';
import axios from 'axios';
import * as dayjs from 'dayjs';
import {
  ENV_KEYS,
  ERROR_MESSAGE,
  PLACE_CATEGORY_KOR_TYPE,
  SUCCESS_MESSAGE,
} from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { Location } from 'src/locations/entities/location.entity';
import { ILocationRepository } from 'src/locations/interface/location.repository.interface';
import { LocationRepository } from 'src/locations/location.repository';
import { PlaceLocation } from 'src/place-locations/entities/place-location.entity';
import { IPlaceLocationRepository } from 'src/place-locations/interface/place-location.repository.interface';
import { PlaceLocationRepository } from 'src/place-locations/place-location.repository';
import { ReviewPlaceLike } from 'src/review-place-likes/entities/review-place-like.entity';
import { IReviewPlaceLikeRepository } from 'src/review-place-likes/interfaces/review-place-like.repository.interface';
import { ReviewPlaceLikeRepository } from 'src/review-place-likes/review-place-like.repository';
import { Review } from 'src/reviews/entities/review.entity';
import { IReviewRepository } from 'src/reviews/interfaces/review.repository.interface';
import { ReviewRepository } from 'src/reviews/review.repository';
import { User } from 'src/users/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import {
  CreatePlaceReviewDto,
  CreatePlaceReviewResponseDto,
} from './dto/create-place-review.dto';
import {
  DeletePlaceReviewDto,
  DeletePlaceReviewResponseDto,
} from './dto/delete-review.dto';
import {
  GetNearbyPlaceListQueryDto,
  GetNearbyPlaceListResponseDto,
} from './dto/get-nearby-place-list.dto';
import {
  GetPlaceReviewDto,
  GetPlaceReviewResponseDto,
} from './dto/get-place-review.dto';
import { GetPlaceResponseDto } from './dto/get-place.dto';
import { PlaceDto } from './dto/place.dto';
import { UpdatePlaceReviewDto } from './dto/update-place-review.dto';
import { Place } from './entities/place.entity';
import { IPlaceRepository } from './interface/place.repository.interface';
import { IPlaceService } from './interface/place.service.interface';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlaceService implements IPlaceService {
  private readonly logger = new Logger(PlaceService.name);

  constructor(
    @Inject(PlaceRepository)
    private readonly placeRepository: IPlaceRepository,
    @Inject(PlaceLocationRepository)
    private readonly placeLocationRepository: IPlaceLocationRepository,
    @Inject(LocationRepository)
    private readonly locationRepository: ILocationRepository,
    @Inject(ReviewRepository)
    private readonly reviewRepository: IReviewRepository,
    @Inject(ReviewPlaceLikeRepository)
    private readonly reviewPlaceLikeRepository: IReviewPlaceLikeRepository,

    private readonly configService: ConfigService,

    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,
  ) {}

  // TODO : cron으로
  async saveEntities() {
    const baseUrl = this.configService.get<string>(
      ENV_KEYS.PUBLIC_PET_API_END_POINT,
    );
    const apiKey = this.configService.get<string>(ENV_KEYS.PUBLIC_PET_API_KEY);

    if (!baseUrl || !apiKey) {
      throw new Error('API URL 또는 키가 설정되지 않았습니다.');
    }

    const numOfRows = 100;
    let pageNo = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const apiUrl = `${baseUrl}/petTourSyncList?serviceKey=${encodeURIComponent(apiKey)}&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json`;
      try {
        console.log(`API 요청: ${apiUrl}`);
        const response = await axios.get(apiUrl);

        const items = response.data.response?.body?.items?.item;

        if (!items || items.length === 0) {
          this.logger.log(
            `더 이상 가져올 데이터가 없습니다. 페이지: ${pageNo}`,
          );
          hasMoreData = false;
          break;
        }

        const entities = items
          .map((item) => this.mapToPlaceEntity(item))
          .filter((entity) => entity !== null);

        if (entities.length === 0) {
          console.warn('유효한 데이터가 없어 저장을 건너뜁니다.');
          pageNo++;
          continue;
        }

        await this.saveEntitiesToDB(entities);

        this.logger.log(`성공적으로 처리된 페이지: ${pageNo}`);
        pageNo++;
      } catch (error) {
        this.logger.error(`API 호출 오류: ${error.message}`);
        hasMoreData = false;
      }
    }
  }

  mapToPlaceEntity(item: PlaceDto): {
    place: Place;
    placeLocation: PlaceLocation;
    location: Location;
  } {
    const place = new Place();
    const addr1 = item.addr1?.trim() ?? '';
    const addr2 = item.addr2?.trim() ?? '';

    place.name = item.title ?? null;
    place.postalCode = item.zipcode ?? null;
    place.roadNameAddress = [addr1, addr2].filter(Boolean).join(' ').trim();
    place.contact = item.tel && item.tel.trim() ? item.tel.trim() : null;
    place.lastUpdate = item.modifiedtime
      ? dayjs(item.modifiedtime, 'YYYYMMDDHHmmss').toDate()
      : null;

    const location = new Location();
    location.point = `POINT(${item.mapx} ${item.mapy})`;

    const placeLocation = new PlaceLocation();
    placeLocation.place = place;
    placeLocation.location = location;
    return {
      place,
      placeLocation,
      location,
    };
  }

  async saveEntitiesToDB(
    entities: {
      place: Place;
      placeLocation: PlaceLocation;
      location: Location;
    }[],
  ): Promise<void> {
    try {
      const places = entities.map((e) => e.place);
      const placeLocations = entities.map((e) => e.placeLocation);
      const locations = entities.map((e) => e.location);

      await Promise.all([
        this.placeRepository.save(places, { reload: false }),
        this.placeLocationRepository.save(placeLocations, { reload: false }),
        this.locationRepository.save(locations, { reload: false }),
      ]);

      this.logger.log('모든 엔터티가 성공적으로 저장되었습니다.');
    } catch (e) {
      this.logger.error(`엔터티 저장 실패: ${e.message}`);

      throw new Error(`엔터티 저장 실패: ${e.message}`);
    }
  }

  async getNearbyPlaces(
    getNearbyPlaceQueryDto: GetNearbyPlaceListQueryDto,
  ): Promise<ResponseData<GetNearbyPlaceListResponseDto[]>> {
    this.logger.log('주변 반경 시설 조회.');

    const category = PLACE_CATEGORY_KOR_TYPE[getNearbyPlaceQueryDto.category];

    const result = await this.placeRepository.findNearbyPlaces(
      getNearbyPlaceQueryDto.longitude,
      getNearbyPlaceQueryDto.latitude,
      getNearbyPlaceQueryDto.radius,
      category,
    );
    if (!result.length) {
      return {
        message: ERROR_MESSAGE.NOT_FOUND,
        data: null,
      };
    }

    const resData: ResponseData<GetNearbyPlaceListResponseDto[]> = {
      message: SUCCESS_MESSAGE.REQUEST,

      data: result
        .filter(
          (place) =>
            place.placeLocation?.[0]?.location?.point && place.category,
        )
        .map((place) => {
          const point = place.placeLocation[0].location.point;
          const POINT_NAME = 'POINT(';
          const slicePoint = point.slice(POINT_NAME.length, point.length - 1);
          const numPoint = slicePoint.split(' ').map(Number);
          const longitude = numPoint[0];
          const latitude = numPoint[1];
          return {
            id: place.id,
            category: place.category,
            name: place.name,
            latitude: latitude,
            longitude: longitude,
          };
        }),
    };

    return resData;
  }

  async getPlace(id: number): Promise<ResponseData<GetPlaceResponseDto>> {
    const place = await this.placeRepository
      .createQueryBuilder('place')
      .leftJoinAndSelect('place.review', 'review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('user.userImage', 'userImage')
      .where('place.id = :id', { id })
      .getOne();

    if (!place) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const getPlaceResponseDto = new GetPlaceResponseDto();
    getPlaceResponseDto.id = place.id;
    getPlaceResponseDto.name = place.name ?? null;
    getPlaceResponseDto.roadNameAddress = place.roadNameAddress ?? null;
    getPlaceResponseDto.postalAddress = place.postalAddress ?? null;
    getPlaceResponseDto.postalCode = place.postalCode ?? null;
    getPlaceResponseDto.openingHour = place.openingHour ?? null;
    getPlaceResponseDto.closingDays = place.closingDays ?? null;
    getPlaceResponseDto.hasParkingArea = place.hasParkingArea ?? null;
    getPlaceResponseDto.contact = place.contact ?? null;
    getPlaceResponseDto.price = place.price ?? null;
    getPlaceResponseDto.allowSize = place.allowSize ?? null;
    getPlaceResponseDto.restrictions = place.restrictions ?? null;
    getPlaceResponseDto.description = place.description ?? null;
    getPlaceResponseDto.additionalFees = place.additionalFees ?? null;
    getPlaceResponseDto.reviewList = [];

    const reviewList = getPlaceResponseDto.reviewList;

    place.review.forEach((review) => {
      reviewList.push({
        id: review.id,
        userId: review.user?.id ?? null,
        nickname: review.user?.nickname ?? null,
        imageUrl: review.user?.userImage?.[0]?.image?.url ?? null,
        title: review.title ?? null,
        content: review.content ?? null,
        isLikeClicked: review.reviewPlaceLike?.length > 0,
      });
    });

    const resData: ResponseData<GetPlaceResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: getPlaceResponseDto,
    };

    return resData;
  }

  async createPlaceReview(
    createPlaceReviewDto: CreatePlaceReviewDto,
  ): Promise<ResponseData<CreatePlaceReviewResponseDto>> {
    const { title, content, isLikeClicked } = createPlaceReviewDto;

    const user = new User();
    user.id = createPlaceReviewDto.userId;

    const place = new Place();
    place.id = createPlaceReviewDto.id;

    const review = new Review();
    review.title = title;
    review.content = content;
    review.user = user;
    review.place = place;

    const reviewId = await this.dataSource.transaction<number>(
      async (manager: EntityManager): Promise<number> => {
        const reviewRepository = manager.withRepository(this.reviewRepository);
        const reviewPlaceLikeRepository = manager.withRepository(
          this.reviewPlaceLikeRepository,
        );

        const savedReview = await reviewRepository.save(review);

        if (isLikeClicked) {
          const reviewPlaceLike = new ReviewPlaceLike();
          reviewPlaceLike.isLikeClicked = isLikeClicked;
          reviewPlaceLike.place = place;
          reviewPlaceLike.review = savedReview;
          await reviewPlaceLikeRepository.save(reviewPlaceLike, {
            reload: false,
          });
        }

        return savedReview.id;
      },
    );

    const resData: ResponseData<CreatePlaceReviewResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: { reviewId },
    };

    return resData;
  }

  async getPlaceReview(
    getPlaceReviewDto: GetPlaceReviewDto,
  ): Promise<ResponseData<GetPlaceReviewResponseDto>> {
    const { id, reviewId } = getPlaceReviewDto;

    const review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
        place: { id },
      },
      relations: ['user', 'place', 'reviewPlaceLike'],
    });

    if (!review) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const resData: ResponseData<GetPlaceReviewResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: {
        reviewId: review.id,
        author: {
          id: review.user.id,
          imageUrl: review.user.userImage[0].image.url,
        },
        id: review.place.id,
        title: review.title,
        content: review.content,
        isLikeClicked:
          review.reviewPlaceLike?.some((like) => like.isLikeClicked) || false,
        createdAt: review.createdAt,
      },
    };

    return resData;
  }

  async updatePlaceReview(updatePlaceReviewDto: UpdatePlaceReviewDto) {
    const { id, userId, title, content, isLikeClicked, reviewId } =
      updatePlaceReviewDto;

    return await this.dataSource.transaction(async (manager) => {
      const reviewRepository = manager.withRepository(this.reviewRepository);
      const reviewPlaceLikeRepository = manager.withRepository(
        this.reviewPlaceLikeRepository,
      );

      const review = await reviewRepository
        .createQueryBuilder('review')
        .select([
          'review.id',
          'review.title',
          'review.content',
          'user.id',
          'reviewPlaceLike.id',
        ])
        .leftJoinAndSelect('review.user', 'user')
        .leftJoinAndSelect('review.reviewPlaceLike', 'reviewPlaceLike')
        .where('review.id = :reviewId', { reviewId })
        .andWhere('review.placeId = :placeId', { placeId: id })
        .andWhere('review.userId =:userId', { userId: userId })
        .getOne();
      if (!review) {
        throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
      }

      review.title = title;
      review.content = content;
      await reviewRepository.save(review, { reload: false });

      const likeRecord = review.reviewPlaceLike;

      if (!isLikeClicked) {
        await reviewPlaceLikeRepository.remove(likeRecord);
      } else if (isLikeClicked && likeRecord.length === 0) {
        const reviewPlaceLike = new ReviewPlaceLike();
        reviewPlaceLike.isLikeClicked = true;
        reviewPlaceLike.place = { id } as Place;
        reviewPlaceLike.review = { id: reviewId } as Review;

        await reviewPlaceLikeRepository.save(reviewPlaceLike, {
          reload: false,
        });
      }

      return {
        message: SUCCESS_MESSAGE.REQUEST,
        data: {
          placeId: id,
          reviewId: review.id,
        },
      };
    });
  }

  async deletePlaceReview(
    deletePlaceReviewDto: DeletePlaceReviewDto,
  ): Promise<ResponseData<DeletePlaceReviewResponseDto>> {
    const { id, userId, reviewId } = deletePlaceReviewDto;

    return await this.dataSource.transaction(
      async (manager): Promise<ResponseData<DeletePlaceReviewResponseDto>> => {
        const reviewRepository = manager.withRepository(this.reviewRepository);
        const reviewPlaceLikeRepository = manager.withRepository(
          this.reviewPlaceLikeRepository,
        );
        const review = await reviewRepository
          .createQueryBuilder('review')
          .select(['review.id', 'reviewPlaceLike.id'])
          .leftJoinAndSelect('review.user', 'user')
          .leftJoinAndSelect('review.reviewPlaceLike', 'reviewPlaceLike')
          .where('review.id = :reviewId', { reviewId })
          .andWhere('review.placeId = :placeId', { placeId: id })
          .andWhere('review.userId =:userId', { userId: userId })
          .getOne();

        if (!review) {
          throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
        }

        const likeRecord = review.reviewPlaceLike;
        await reviewPlaceLikeRepository.remove(likeRecord);

        await reviewRepository.remove(review);

        return {
          message: SUCCESS_MESSAGE.REQUEST,
          data: {
            id: id,
          },
        };
      },
    );
  }
}

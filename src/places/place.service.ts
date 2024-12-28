import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getDataSourceToken } from '@nestjs/typeorm';
import axios from 'axios';
import * as dayjs from 'dayjs';
import { ENV_KEYS, SUCCESS_MESSAGE } from 'src/common/constants';
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
import { CreatePlaceReviewDto } from './dto/create-place-review.dto';
import { GetPlaceResponseDto } from './dto/get-place.dto';
import { PlaceDto } from './dto/place.dto';
import { Place } from './entities/place.entity';
import { IPlaceRepository } from './interface/place.repository.interface';
import { IPlaceService } from './interface/place.service.interface';
import { PlaceRepository } from './place.repository';
import { GetPlaceReviewDto } from './dto/get-place-review.dto';

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

  //공공 데이터 api 호출
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

  // TODO : 함수 밖으로 빼 버려
  // 데이터를 각각의 엔티티로 변환
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

  // 변환된 데이터를 각 레포에 저장
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
        this.placeRepository.save(places),
        this.placeLocationRepository.save(placeLocations),
        this.locationRepository.save(locations),
      ]);

      this.logger.log('모든 엔터티가 성공적으로 저장되었습니다.');
    } catch (e) {
      this.logger.error(`엔터티 저장 실패: ${e.message}`);

      throw new Error(`엔터티 저장 실패: ${e.message}`);
    }
  }

  // 주변 반경 조회
  async getNearbyPlaces(
    lat: number,
    lon: number,
    radius: number,
  ): Promise<ResponseData> {
    this.logger.log('주변 반경 시설 조회.');

    const result = await this.placeRepository.findNearbyPlaces(
      lon,
      lat,
      radius,
    );

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: result,
    };
    return resData;
  }

  // 시설물 id기반 조회
  async getPlace(id: number): Promise<GetPlaceResponseDto> {
    const place = await this.placeRepository.findByPlace(id);
    if (!place) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 시설물이 존재하지 않습니다.`,
      );
    }

    return {
      id: place.id,
      name: place.name ?? null,
      roadNameAddress: place.roadNameAddress ?? null,
      postalAddress: place.postalAddress ?? null,
      postalCode: place.postalCode ?? null,
      openingHour: place.openingHour ?? null,
      closingDays: place.closingDays ?? null,
      hasParkingArea: place.hasParkingArea ?? null,
      contact: place.contact ?? null,
      price: place.price ?? null,
      allowSize: place.allowSize ?? null,
      restrictions: place.restrictions ?? null,
      description: place.description ?? null,
      additionalFees: place.additionalFees ?? null,
      reviewList: [],
    };
  }

  async createPlaceReview(
    createPlaceReviewDto: CreatePlaceReviewDto,
  ): Promise<ResponseData> {
    const { title, content, isLikeClicked } = createPlaceReviewDto;

    console.log(createPlaceReviewDto.userId);

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
          await reviewPlaceLikeRepository.save(reviewPlaceLike);
        }

        return savedReview.id;
      },
    );

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: { reviewId },
    };

    return resData;
  }

  async getPlaceReview(
    getPlaceReviewDto: GetPlaceReviewDto,
  ): Promise<ResponseData> {
    const { id, reviewId, userId } = getPlaceReviewDto;

    const review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
        place: { id },
      },
      relations: ['user', 'place', 'reviewPlaceLike'],
    });

    if (!review) {
      throw new NotFoundException(
        `ID ${reviewId}에 해당되는 리뷰를 찾을 수 없습니다.`,
      );
    }

    const isAuthor = review.user.id === userId;

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: {
        reviewId: review.id,
        author: {
          id: review.user.id,
          imageUrl: review.user.userImage || null,
        },
        placeId: review.place.id,
        title: review.title,
        content: review.content,
        isLikeClicked:
          review.reviewPlaceLike?.some((like) => like.isLikeClicked) || false,
        createdAt: review.createdAt,
        isAuthor,
      },
    };

    return resData;
  }

  // TODO user.image // title, content, isLikeClicked
  async updateReview(
    id: number,
    userId: number,
    title: string,
    content: string,
    isLikeClicked: boolean,
    reviewId: number,
  ) {
    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: {},
    };
    return resData;
  }

  // TODO 리뷰 삭제 userid있어야함
  async deleteReview() {}
}

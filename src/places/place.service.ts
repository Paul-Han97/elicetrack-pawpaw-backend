import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as dayjs from 'dayjs';
import { ENV_KEYS, SUCCESS_MESSAGE } from 'src/common/constants';
import { Location } from 'src/locations/entities/location.entity';
import { ILocationRepository } from 'src/locations/interface/location.repository.interface';
import { LocationRepository } from 'src/locations/location.repository';
import { PlaceLocation } from 'src/place-locations/entities/place-location.entity';
import { IPlaceLocationRepository } from 'src/place-locations/interface/place-location.repository.interface';
import { PlaceLocationRepository } from 'src/place-locations/place-location.repository';
import { PlaceDto } from './dto/place.dto';
import { Place } from './entities/place.entity';
import { IPlaceRepository } from './interface/place.repository.interface';
import { IPlaceService } from './interface/place.service.interface';
import { PlaceRepository } from './place.repository';
import { ResponseData } from 'src/common/types/response.type';
import { GetPlaceResponseDto } from './dto/get-place.dto';
import {
  CreatePlaceReviewDto,
  CreatePlaceReviewResponseDto,
} from './dto/create-place-review.dto';
import { ReviewRepository } from 'src/reviews/review.repository';
import { IReviewRepository } from 'src/reviews/interfaces/review.repository.interface';

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
    private readonly configService: ConfigService,
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
    console.log('API 데이터:', item);

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
    id: number,
    userId: number,
    createPlaceReviewDto: CreatePlaceReviewDto,
  ): Promise<CreatePlaceReviewResponseDto> {
    const { title, content, isLikeClicked } = createPlaceReviewDto;

    const review = await this.placeRepository.createReview(
      id,
      userId,
      title,
      content,
      isLikeClicked,
    );

    return {
      placeId: review.place.id,
    };
  }

  // TODO user.image // title, content, isLikeClicked
  async getPlaceReview() {}

  // TODO user.image // title, content, isLikeClicked
  async updateReview() {}

  // TODO 리뷰 삭제 userid있어야함
  async deleteReview() {}
}

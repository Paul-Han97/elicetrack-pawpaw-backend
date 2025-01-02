import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import axios from 'axios';
import { CronJob } from 'cron';
import * as dayjs from 'dayjs';
import { ENV_KEYS, PLACE_API } from 'src/common/constants';
import { Location } from 'src/locations/entities/location.entity';
import { ILocationRepository } from 'src/locations/interface/location.repository.interface';
import { LocationRepository } from 'src/locations/location.repository';
import { PlaceLocation } from 'src/place-locations/entities/place-location.entity';
import { IPlaceLocationRepository } from 'src/place-locations/interface/place-location.repository.interface';
import { PlaceLocationRepository } from 'src/place-locations/place-location.repository';
import { PlaceDto } from 'src/places/dto/place.dto';
import { Place } from 'src/places/entities/place.entity';
import { IPlaceRepository } from 'src/places/interface/place.repository.interface';
import { PlaceRepository } from 'src/places/place.repository';
import * as xml2js from 'xml2js';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @Inject(PlaceRepository)
    private readonly placeRepository: IPlaceRepository,
    @Inject(PlaceLocationRepository)
    private readonly placeLocationRepository: IPlaceLocationRepository,
    @Inject(LocationRepository)
    private readonly locationRepository: ILocationRepository,
    private readonly configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    const name = PLACE_API;

    const job = new CronJob('*/10 * * * * *', async () => {
      await this.saveEntities();
    });
    this.schedulerRegistry.addCronJob(name, job);
  }

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
        this.logger.log(`API 요청: ${apiUrl}`);
        const response = await axios.get(apiUrl);

        const contentType = response.headers['content-type'];

        if (contentType && contentType.includes('application/xml')) {
          const parsedResponse = await xml2js.parseStringPromise(
            response.data,
            {
              explicitArray: false,
            },
          );

          const reasonCode =
            parsedResponse.OpenAPI_ServiceResponse.cmmMsgHeader
              ?.returnReasonCode;

          if (reasonCode === '22') {
            const job = this.schedulerRegistry.getCronJob(PLACE_API);
            job.stop();
            this.logger.warn('공공데이터 API 호출 수 초과 - 크론 작업 중지');
          }
          return;
        }
        const items = response.data.response?.body?.items?.item;
        this.logger.log(items);

        if (!items || items.length === 0) {
          this.logger.debug(
            `더 이상 가져올 데이터가 없습니다. 페이지: ${pageNo}`,
          );
          hasMoreData = false;
          break;
        }
        const entities = items
          .map((item) => this.mapToPlaceEntity(item))
          .filter((entity) => entity !== null);

        if (entities.length === 0) {
          this.logger.warn('유효한 데이터가 없어 저장을 건너뜁니다.');
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
}

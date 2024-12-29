import { ResponseData } from 'src/common/types/response.type';
import { CreatePlaceReviewDto, CreatePlaceReviewResponseDto } from '../dto/create-place-review.dto';
import { GetPlaceResponseDto } from '../dto/get-place.dto';
import { Place } from '../entities/place.entity';

export interface IPlaceService {
  saveEntities(): Promise<void>;

  getNearbyPlaces(
    lat: number,
    lon: number,
    radius: number,
  ): Promise<ResponseData<Place[]>>;

  getPlace(id: number): Promise<GetPlaceResponseDto>;

  createPlaceReview(
    createPlaceReviewDto: CreatePlaceReviewDto,
  ): Promise<ResponseData<CreatePlaceReviewResponseDto>>;
}

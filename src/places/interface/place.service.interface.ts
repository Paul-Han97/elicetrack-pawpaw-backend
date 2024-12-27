import { ResponseData } from 'src/common/types/response.type';
import { Place } from '../entities/place.entity';
import { GetPlaceResponseDto } from '../dto/get-place.dto';
import {
  CreatePlaceReviewDto,
  CreatePlaceReviewResponseDto,
} from '../dto/create-place-review.dto';

export interface IPlaceService {
  saveEntities(): Promise<void>;

  getNearbyPlaces(
    lat: number,
    lon: number,
    radius: number,
  ): Promise<ResponseData>;

  getPlace(id: number): Promise<GetPlaceResponseDto>;

  createPlaceReview(
    id: number,
    userId: number,
    createPlaceReviewDto: CreatePlaceReviewDto,
  ): Promise<CreatePlaceReviewResponseDto>;
}

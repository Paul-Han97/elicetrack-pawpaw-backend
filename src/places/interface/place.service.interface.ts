import { ResponseData } from 'src/common/types/response.type';
import { CreatePlaceReviewDto } from '../dto/create-place-review.dto';
import { GetPlaceResponseDto } from '../dto/get-place.dto';
import { GetPlaceReviewDto } from '../dto/get-place-review.dto';
import { UpdatePlaceReviewDto } from '../dto/update-place-review.dto';

export interface IPlaceService {
  saveEntities(): Promise<void>;

  getNearbyPlaces(
    lat: number,
    lon: number,
    radius: number,
  ): Promise<ResponseData>;

  getPlace(id: number): Promise<GetPlaceResponseDto>;

  createPlaceReview(
    createPlaceReviewDto: CreatePlaceReviewDto,
  ): Promise<ResponseData>;

  getPlaceReview(getPlaceReviewDto: GetPlaceReviewDto): Promise<ResponseData>;

  updateReview(updatePlaceReviewDto: UpdatePlaceReviewDto);
}

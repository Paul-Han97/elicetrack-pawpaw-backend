import { ResponseData } from 'src/common/types/response.type';
import {
  CreatePlaceReviewDto,
  CreatePlaceReviewResponseDto,
} from '../dto/create-place-review.dto';
import {
  GetPlaceReviewDto,
  GetPlaceReviewResponseDto,
} from '../dto/get-place-review.dto';
import { GetPlaceResponseDto } from '../dto/get-place.dto';
import {
  UpdatePlaceReviewDto,
  UpdatePlaceReviewResponseDto,
} from '../dto/update-place-review.dto';
import { Place } from '../entities/place.entity';
import {
  DeletePlaceReviewDto,
  DeletePlaceReviewResponseDto,
} from '../dto/delete-review.dto';
import {
  GetNearbyPlaceListQueryDto,
  GetNearbyPlaceListResponseDto,
} from '../dto/get-nearby-place-list.dto';

export interface IPlaceService {
  saveEntities(): Promise<void>;

  getNearbyPlaces(
    getNearbyPlaceQueryDto: GetNearbyPlaceListQueryDto,
  ): Promise<ResponseData<GetNearbyPlaceListResponseDto[]>>;

  getPlace(id: number): Promise<ResponseData<GetPlaceResponseDto>> 

  createPlaceReview(
    createPlaceReviewDto: CreatePlaceReviewDto,
  ): Promise<ResponseData<CreatePlaceReviewResponseDto>>;

  getPlaceReview(
    getPlaceReviewDto: GetPlaceReviewDto,
  ): Promise<ResponseData<GetPlaceReviewResponseDto>>;

  updatePlaceReview(
    updatePlaceReviewDto: UpdatePlaceReviewDto,
  ): Promise<ResponseData<UpdatePlaceReviewResponseDto>>;

  deletePlaceReview(
    deletePlaceReviewDto: DeletePlaceReviewDto,
  ): Promise<ResponseData<DeletePlaceReviewResponseDto>>;
}

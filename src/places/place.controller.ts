import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import {
  CreateReviewDto,
  CreateReviewResponseDto,
} from './dto/create-review.dto';
import {
  GetNearbyPlaceListQueryDto,
  GetNearbyPlaceListResponseDto,
} from './dto/get-nearby-place-list.dto';
import { GetPlaceResponseDto } from './dto/get-place.dto';
import { IPlaceService } from './interface/place.service.interface';
import { PlaceService } from './place.service';

@Controller('places')
export class PlaceController {
  constructor(
    @Inject(PlaceService)
    private readonly placeService: IPlaceService,
  ) {}

  @ApiOperation({
    summary: '시설물의 위치 정보를 조회 합니다.',
    description: `
    - 입력받은 현재위치와 카테고리 그리고 반경을 기준으로 조회 합니다.`,
  })
  @ApiOkResponse({
    type: GetNearbyPlaceListResponseDto,
  })
  @Get('nearby-place-list')
  async getNearbyPlaceList(
    @Query() getNearbyPlaceListQueryDto: GetNearbyPlaceListQueryDto,
  ) {}

  @ApiOperation({
    summary: '시설물의 정보를 조회 합니다.',
    description: `
    - 입력받은 ID로 시설물의 데이터를 조회 합니다.`,
  })
  @ApiParam({
    name: 'id',
    description: '시설물의 ID',
  })
  @ApiOkResponse({
    type: GetPlaceResponseDto,
  })
  @Get(':id')
  async getPlace(@Param('id') id: number) {}

  @ApiOperation({
    summary: '시설물에 리뷰를 작성 합니다.',
    description: `
    - Place의 id를 입력받아 리뷰를 작성 합니다.
    - 제목과 내용을 입력할 수 있습니다.`,
  })
  @ApiParam({
    name: 'id',
    description: 'place의 id',
  })
  @ApiCreatedResponse({
    type: CreateReviewResponseDto,
  })
  @Post(':id/reviews')
  async createReview(
    @Param('id') id: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {}
}

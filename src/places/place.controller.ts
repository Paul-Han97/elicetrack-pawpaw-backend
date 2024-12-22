import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
  GetNearbyPlaceListQueryDto,
  GetNearbyPlaceListResponseDto,
} from './dto/get-nearby-place-list.dto';
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
  @Get('nearby-place-lists')
  async getNearbyPlaceList(
    @Query() getNearbyPlaceListQueryDto: GetNearbyPlaceListQueryDto,
  ) {}
}

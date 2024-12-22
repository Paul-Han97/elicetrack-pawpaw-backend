import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import {
  GetNearbyPlaceListQueryDto,
  GetNearbyPlaceListResponseDto,
} from './dto/get-nearby-place-list.dto';
import { IPlaceService } from './interface/place.service.interface';
import { PlaceService } from './place.service';
import { GetPlaceResponseDto } from './dto/get-place.dto';

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
}

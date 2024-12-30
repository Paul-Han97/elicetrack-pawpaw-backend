import { ApiProperty } from '@nestjs/swagger';
import {
  PLACE_CATEGORY_KOR_TYPE,
  PLACE_CATEGORY_TYPE,
} from 'src/common/constants';

export class GetNearbyPlaceListQueryDto {
  @ApiProperty({
    description: '시설물의 카테고리(선택)',
    required: false,
    enum: PLACE_CATEGORY_TYPE,
  })
  category: string;

  @ApiProperty({
    description: '조회할 반경',
  })
  radius: number;

  @ApiProperty({
    description: '사용자의 위도',
  })
  latitude: number;

  @ApiProperty({
    description: '사용자의 경도',
  })
  longitude: number;
}

export class GetNearbyPlaceListResponseDto {
  @ApiProperty({
    description: '시설의 ID',
  })
  id: number;

  @ApiProperty({
    description: '시설의 위도',
  })
  latitude: number;

  @ApiProperty({
    description: '시설의 경도',
  })
  longitude: number;

  @ApiProperty({
    description: '시설의 이름',
  })
  name: string;

  @ApiProperty({
    description: '시설의 카테고리',
    required: false,
    enum: PLACE_CATEGORY_KOR_TYPE,
  })
  category: string;
}

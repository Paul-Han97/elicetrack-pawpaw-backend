import { ApiProperty } from '@nestjs/swagger';

export class GetNearbyPlaceListQueryDto {
  @ApiProperty({
    description: '시설물의 카테고리',
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
    description: '시설의 ID'
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
}

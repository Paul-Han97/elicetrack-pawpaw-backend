import { ApiProperty } from '@nestjs/swagger';

export class SaveUserLocationDto {
  id: number;

  @ApiProperty({
    description: '사용자의 위도',
  })
  latitude: number;

  @ApiProperty({
    description: '사용자의 경도',
  })
  longitude: number;
}

export class GetNearbyUserListQueryDto {
  @ApiProperty({
    description: '조회할 반경 (미터 단위)',
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

export class GetNearbyUserListResponseDto {
  @ApiProperty({
    description: '사용자의 ID',
  })
  id: number;

  @ApiProperty({
    description: '사용자의 닉네임',
  })
  nickname: string;
}

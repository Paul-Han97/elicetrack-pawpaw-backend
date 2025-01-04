import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class SaveUserLocationDto {
  id: number;

  @ApiProperty({
    description: '사용자의 위도',
  })
  @IsNumber()
  @Type(() => Number)
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: '사용자의 경도',
  })
  @IsNumber()
  @Type(() => Number)
  @Min(-180)
  @Max(180)
  longitude: number;
}

export class GetNearbyUserListQueryDto {
  @ApiProperty({
    description: '조회할 반경 (미터 단위)',
  })
  @IsNumber()
  @Type(() => Number)
  @Min(250)
  @Max(1000)
  radius: number;

  @ApiProperty({
    description: '사용자의 위도',
  })
  @IsNumber()
  @Type(() => Number)
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: '사용자의 경도',
  })
  @IsNumber()
  @Type(() => Number)
  @Min(-180)
  @Max(180)
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

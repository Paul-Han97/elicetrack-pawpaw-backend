import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PlaceDto {
  @ApiProperty({
    description: '시설명',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '시설의 주소1',
  })
  @IsString()
  addr1: string;

  @ApiProperty({
    description: '시설의 주소2',
  })
  @IsString()
  addr2: string;

  @ApiProperty({
    description: '시설의 연락처',
  })
  @IsString()
  tel: string;

  @ApiProperty({
    description: '시설의 우편번호',
  })
  @IsString()
  zipcode: string;

  @ApiProperty({
    description: '시설의 경도',
  })
  @IsString()
  mapx: string;

  @ApiProperty({
    description: '시설의 위도',
  })
  @IsString()
  mapy: string;

  @ApiProperty({
    description: '시설의 업데이트 날짜',
  })
  @IsString()
  modifiedtime: Date;
}

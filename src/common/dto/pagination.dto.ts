import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: `
    - 조회 할 데이터 수
    - 기본값 : 7
    - 최솟값 : 1
    - 최댓값 : 7`,
    default: 7,
    required: false,
  })
  @Type(() => Number)
  @Min(1)
  @Max(7)
  take: number;

  @ApiProperty({
    description: `
    - 현재 페이지
    - 기본값 : 1
    - 최솟값 : 1`,
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @Min(1)
  perPage: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: `
    - 조회 시작점의 ID (커서)
    - 기본값: null`,
    required: false,
  })
  @Type(() => Number)
  cursor?: number;

  @ApiProperty({
    description: `
    - 조회 할 데이터 수
    - 기본값: 7`,
    default: 7,
    required: false,
  })
  @Type(() => Number)
  @Min(1)
  @Max(7)
  take: number;
}

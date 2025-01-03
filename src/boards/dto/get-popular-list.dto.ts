import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class GetPopularListQueryDto {
  @ApiProperty({
    description: '가져올 게시글 개수',
  })
  @Min(1)
  @Max(7)
  @Type(() => Number)
  count: number;
}

export class GetPopularListResponseDto {
  @ApiProperty({
    description: 'board의 id',
  })
  id: number;

  @ApiProperty({
    description: '게시글의 제목',
  })
  title: string;

  @ApiProperty({
    description: '게시글의 이미지 URL',
  })
  imageUrl: string;

  @ApiProperty({
    description: '게시글의 카테고리',
  })
  category: string;
}

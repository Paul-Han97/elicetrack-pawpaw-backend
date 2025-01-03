import { ApiProperty } from '@nestjs/swagger';
import { GetPopularListQueryDto } from './get-popular-list.dto';

export class GetLatestListQueryDto extends GetPopularListQueryDto {}

export class GetLatestListResponseDto {
  @ApiProperty({
    description: '게시글의 ID',
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

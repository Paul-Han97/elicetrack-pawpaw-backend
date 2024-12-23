import { ApiProperty } from '@nestjs/swagger';

export class GetPlaceReviewDto {
  @ApiProperty({
    description: '리뷰의 제목',
  })
  title: string;

  @ApiProperty({
    description: '리뷰의 내용',
  })
  conent: string;

  @ApiProperty({
    description: '좋아요 선택 여부',
  })
  isLike: boolean;

  @ApiProperty({
    description: '리뷰의 작성 날짜',
  })
  createdAt: Date;
}

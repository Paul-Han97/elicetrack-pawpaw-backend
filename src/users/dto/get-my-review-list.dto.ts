import { ApiProperty } from '@nestjs/swagger';

export class GetMyReviewListDto {
  @ApiProperty({
    description: '리뷰 ID',
  })
  reviewId: number;

  @ApiProperty({
    description: '장소의 ID',
  })
  placeId: number;

  @ApiProperty({
    description: '리뷰 제목',
  })
  title: string;

  @ApiProperty({
    description: '리뷰 내용',
  })
  content: string;

  @ApiProperty({
    description: '사용자가 리뷰 좋아요를 클릭 했는지 여부',
  })
  isLikeCliked: boolean;
}

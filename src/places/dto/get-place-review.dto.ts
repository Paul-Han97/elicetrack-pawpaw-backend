import { ApiProperty } from '@nestjs/swagger';

export class GetPlaceReviewDto {
  @ApiProperty({
    description: '리뷰가 작정된 장소의 ID',
  })
  id: number;

  @ApiProperty({
    description: '리뷰의 ID',
  })
  reviewId: number;
}

export class GetPlaceReviewResponseDto {
  @ApiProperty({
    description: '리뷰의 ID',
  })
  reviewId: number;

  @ApiProperty({
    description: '리뷰 작성자의 정보',
  })
  author: { id: number; imageUrl: string };

  @ApiProperty({
    description: '리뷰가 작성된 장소의 ID',
  })
  id: number;

  @ApiProperty({
    description: '리뷰의 제목',
  })
  title: string;

  @ApiProperty({
    description: '리뷰의 내용',
  })
  content: string;

  @ApiProperty({
    description: '리뷰의 좋아요 상태',
  })
  isLikeClicked: boolean;

  @ApiProperty({
    description: '리뷰의 작성 날짜',
  })
  createdAt: Date;
}

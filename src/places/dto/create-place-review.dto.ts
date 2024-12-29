import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceReviewDto {
  @ApiProperty({
    description: '리뷰의 제목',
  })
  title: string;

  @ApiProperty({
    description: '리뷰의 내용',
  })
  content: string;

  @ApiProperty({
    description: '좋아요 선택 여부',
  })
  isLikeClicked: boolean;

  id: number;

  userId: number;
}

export class CreatePlaceReviewResponseDto {
  @ApiProperty({
    description: '리뷰의 ID',
  })
  reviewId: number;
}

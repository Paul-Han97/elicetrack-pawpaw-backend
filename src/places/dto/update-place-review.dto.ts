import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaceReviewDto {
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

  @ApiProperty({
    description: '장소의 ID',
  })
  id: number;

  @ApiProperty({
    description: '유저의 ID',
  })
  userId: number;

  @ApiProperty({
    description: '리뷰의 ID',
  })
  reviewId: number;
}

export class UpdatePlaceReviewResponseDto {
  @ApiProperty({
    description: '장소의 ID',
  })
  placeId: number;
}

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
}

export class CreatePlaceReviewResponseDto {
  @ApiProperty({
    description: '장소의 ID',
  })
  placeId: number;
}

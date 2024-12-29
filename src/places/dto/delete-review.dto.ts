import { ApiProperty } from '@nestjs/swagger';

export class DeletePlaceReviewDto {
  id: number;

  userId: number;

  reviewId: number;
}

export class DeletePlaceReviewResponseDto {
  @ApiProperty({
    description: '장소의 ID',
  })
  id: number;
}

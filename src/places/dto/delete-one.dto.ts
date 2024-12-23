import { ApiProperty } from '@nestjs/swagger';

export class DeleteReviewResponseDto {
  @ApiProperty({
    description: '장소의 ID',
  })
  placeId: number;
}

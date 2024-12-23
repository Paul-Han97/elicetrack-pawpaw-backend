import { ApiProperty } from '@nestjs/swagger';

export class UpdateOneDto {
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
}

export class UpdateOneResponseDto {
  @ApiProperty({
    description: '장소의 ID',
  })
  placeId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsByteLength, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePlaceReviewDto {
  @ApiProperty({
    description: '리뷰의 제목',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @ApiProperty({
    description: '리뷰의 내용',
  })
  @IsString()
  @IsByteLength(0, 1000)
  content: string;

  @ApiProperty({
    description: '좋아요 선택 여부',
  })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    return value === 'true' || value === true;
  })
  @IsOptional()
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

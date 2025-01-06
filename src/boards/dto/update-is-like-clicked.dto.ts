import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateIsLikeClickedDto {
  @ApiProperty({
    description: '게시글 좋아요 클릭 여부',
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

  userId: number;
  id: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class ImageList {
  @ApiProperty({
    description: '대표 이미지 여부',
  })
  isPrimary: boolean;

  @ApiProperty({
    description: '이미지의 URL',
  })
  url: string;
}

export class GetMyBoardListResponseDto {
  @ApiProperty({
    description: '게시글의 ID',
  })
  boardId: number;

  @ApiProperty({
    description: '게시글의 제목',
  })
  title: string;

  @ApiProperty({
    description: '게시글의 내용',
  })
  content: string;

  @ApiProperty({
    description: '게시글의 이미지 배열',
    isArray: true,
    type: ImageList,
  })
  @ValidateNested({ each: true })
  @Type(() => ImageList)
  imageList: ImageList[];

  @ApiProperty({
    description: '게시글의 카테고리',
  })
  boardCategory: string;

  @ApiProperty({
    description: '사용자가 게시글의 좋아요를 클릭 했는지 여부',
  })
  isLikeCliked: boolean;
}

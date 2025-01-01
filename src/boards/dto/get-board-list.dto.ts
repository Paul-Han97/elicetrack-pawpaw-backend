import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BOARD_CATEGORY_TYPE } from 'src/common/constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

class Author {
  @ApiProperty({
    description: '작성자의 ID',
  })
  id: number;

  @ApiProperty({
    description: '작성자의 닉네임',
  })
  nickname: string;
}

class BoardList {
  @ApiProperty({
    description: '게시글의 제목',
  })
  id: number;

  @ApiProperty({
    description: '게시글의 카테고리',
  })
  category: string;

  @ApiProperty({
    description: '게시글 작성자',
    type: Author,
  })
  @ValidateNested()
  @Type(() => Author)
  author: Author;

  @ApiProperty({
    description: '게시글의 제목',
  })
  title: string;

  @ApiProperty({
    description: '게시글의 내용',
  })
  content: string;

  @ApiProperty({
    description: '사용자가 게시글의 좋아요를 클릭 했는지 여부',
  })
  isLikeClicked: boolean;

  @ApiProperty({
    description: '이미지 목록',
    isArray: true,
    type: ImageList,
  })
  @ValidateNested({ each: true })
  @Type(() => ImageList)
  imageList: ImageList[];
}

export class GetBoardListQueryDto extends PaginationDto {
  @ApiProperty({
    enum: BOARD_CATEGORY_TYPE,
    description: `
      - 게시글의 카테고리
      - 기본값 : 전체`,
    required: false,
  })
  category: string;

  userId: number;
}

export class GetBoardListResponseDto {
  @ApiProperty({
    description: '게시글 목록',
    isArray: true,
    type: BoardList,
  })
  @ValidateNested({ each: true })
  @Type(() => BoardList)
  boardList: BoardList[];

  @ApiProperty({
    description: '조회된 게시글 수',
  })
  total: number;

  constructor() {
    this.boardList = [];
  }
}

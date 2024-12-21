import { ApiProperty } from '@nestjs/swagger';
import { BOARD_CATEGORY_TYPE } from 'src/common/constants';

export class CreateOneDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    isArray: true,
    description: '게시글의 이미지',
  })
  imageList: Express.Multer.File[];

  @ApiProperty({
    description: '게시글의 카테고리',
    enum: BOARD_CATEGORY_TYPE,
  })
  category: string;

  @ApiProperty({
    description: '게시글의 제목',
  })
  title: string;

  @ApiProperty({
    description: '게시글의 내용',
  })
  content: string;
}

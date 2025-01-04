import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { BOARD_CATEGORY_TYPE } from 'src/common/constants';

export class CreateBoardDto {
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
  @IsEnum(BOARD_CATEGORY_TYPE)
  category: BOARD_CATEGORY_TYPE;

  @ApiProperty({
    description: '게시글의 제목',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @ApiProperty({
    description: '게시글의 내용',
  })
  @IsString()
  @IsByteLength(0,1500)
  content: string;

  userId: number;
}

export class CreateBoardResponseDto {
  @ApiProperty({
    description: '게시글의 ID',
  })
  id: number;
}

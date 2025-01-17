import { ApiProperty } from '@nestjs/swagger';
import {
  IsByteLength,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BOARD_CATEGORY_TYPE } from 'src/common/constants';

export class UpdateBoardDto {
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
  @IsOptional()
  @IsEnum(BOARD_CATEGORY_TYPE)
  category: BOARD_CATEGORY_TYPE;

  @ApiProperty({
    description: '게시글의 제목',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  title: string;

  @ApiProperty({
    description: '게시글의 내용',
  })
  @IsOptional()
  @IsString()
  @IsByteLength(0, 1500)
  content: string;

  userId: number;

  id: number;
}

export class UpdateBoardResponseDto {
  @ApiProperty({
    description: '게시글의 ID',
  })
  id: number;
}

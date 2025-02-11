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

class Author {
  @ApiProperty({
    description: '게시글 작성자 ID',
  })
  id: number;

  @ApiProperty({
    description: '작성자의 닉네임',
  })
  nickname: string;

  @ApiProperty({
    description: '작성자의 프로필 이미지'
  })
  imageUrl: string;

  constructor() {
    this.id = null;
    this.nickname = null;
    this.imageUrl = null;
  }
}

class CommentList {
  @ApiProperty({
    description: '댓글의 ID',
  })
  id: number;

  @ApiProperty({
    description: '댓글의 내용',
  })
  content: string;

  @ApiProperty({
    description: '댓글의 작성 날짜',
  })
  createdAt: Date;

  @ApiProperty({
    description: '댓글 작성자',
    type: Author,
  })
  author: Author;

  constructor() {
    this.author = new Author();
  }
}

export class GetBoardResponseDto {
  @ApiProperty({
    description: '사용자의 닉네임',
  })
  nickname: string;

  @ApiProperty({
    description: '게시글의 제목',
  })
  title: string;

  @ApiProperty({
    description: '게시글의 내용',
  })
  content: string;

  @ApiProperty({
    description: '게시글의 좋아요 개수',
  })
  likeCount: number;

  @ApiProperty({
    description: '게시글 작성 날짜',
  })
  createdAt: Date;

  @ApiProperty({
    description: '게시글 작성자',
    type: Author,
  })
  author: Author;

  @ApiProperty({
    description: '사용자가 게시글의 좋아요를 클릭 했는지 여부',
  })
  isLikeClicked: boolean;

  @ApiProperty({
    description: '이미지 리스트',
    isArray: true,
    type: ImageList,
  })
  @ValidateNested({ each: true })
  @Type(() => ImageList)
  imageList: ImageList[];

  @ApiProperty({
    description: '게시글의 댓글 목록',
    isArray: true,
    type: CommentList,
  })
  @ValidateNested({ each: true })
  @Type(() => CommentList)
  commentList: CommentList[];

  constructor() {
    this.author = new Author();
    this.imageList = [];
    this.commentList = [];
  }
}

export class GetBoardDto {
  id: number;
  userId: number;
}

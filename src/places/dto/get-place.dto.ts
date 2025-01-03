import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class ReviewList {
  @ApiProperty({
    description: '리뷰의 ID',
  })
  id: number;

  @ApiProperty({
    description: '리뷰 작성자의 ID',
  })
  userId: number;

  @ApiProperty({
    description: '리뷰 작성자 닉네임',
  })
  nickname: string;

  @ApiProperty({
    description: '리뷰 작성자 이미지',
  })
  imageUrl: string;

  @ApiProperty({
    description: '리뷰의 제목',
  })
  title: string;

  @ApiProperty({
    description: '리뷰의 내용',
  })
  content: string;

  @ApiProperty({
    description: '리뷰의 좋아요 상태',
  })
  isLikeClicked: boolean;
}

export class GetPlaceResponseDto {
  @ApiProperty({
    description: '시설의 ID',
  })
  id: number;

  @ApiProperty({
    description: '시설명',
  })
  name: string;

  @ApiProperty({
    description: '시설의 도로명 주소',
  })
  roadNameAddress: string;

  @ApiProperty({
    description: '시설의 지번 주소',
  })
  postalAddress: string;

  @ApiProperty({
    description: '시설의 우편 번호',
  })
  postalCode: string;

  @ApiProperty({
    description: '시설의 운영시간',
  })
  openingHour: string;

  @ApiProperty({
    description: '시설의 휴무일',
  })
  closingDays: string;

  @ApiProperty({
    description: '시설의 주차 가능 여부',
  })
  hasParkingArea: boolean;

  @ApiProperty({
    description: '시설의 연락처',
  })
  contact: string;

  @ApiProperty({
    description: '시설의 가격 정보',
  })
  price: string;

  @ApiProperty({
    description: '입장 가능 동물 크기',
  })
  allowSize: string;

  @ApiProperty({
    description: '반려동물 제한사항',
  })
  restrictions: string;

  @ApiProperty({
    description: '시설의 상세설명',
  })
  description: string;

  @ApiProperty({
    description: '애견 동반 추가 요금',
  })
  additionalFees: string;

  @ApiProperty({
    description: '댓글 목록',
    isArray: true,
    type: ReviewList,
  })
  @ValidateNested({ each: true })
  @Type(() => ReviewList)
  reviewList?: ReviewList[];
}

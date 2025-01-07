import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class PetList {
  @ApiProperty({
    description: '반려동물 ID',
  })
  id: number;

  @ApiProperty({
    description: '반려동물 이름',
  })
  name: string;

  @ApiProperty({
    description: '반려동물 나이',
  })
  age: number;

  @ApiProperty({
    description: '반려동물 성격',
  })
  description: string;

  @ApiProperty({
    description: '반려동물 성별',
  })
  gender: string;

  @ApiProperty({
    description: '반려동물 크기',
  })
  size: string;

  @ApiProperty({
    description: '반려동물 이미지 URL',
  })
  imageUrl: string;
}

export class GetMyPageResponseDto {
  @ApiProperty({
    description: '사용자의 ID',
  })
  id: number;
  
  @ApiProperty({
    description: '사용자의 닉네임',
  })
  nickname: string;

  @ApiProperty({
    description: '사용자의 산책메이트 기능 ON/OFF 여부',
  })
  canWalkingMate: boolean;

  @ApiProperty({
    description: '사용자의 프로필 이미지 URL',
  })
  imageUrl: string

  @ApiProperty({
    description: '반려동물 목록',
    isArray: true,
    type: PetList,
  })
  @ValidateNested({ each: true })
  @Type(() => PetList)
  petList: PetList[];
}

import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  id: number;
}

export class GetUserResponseDto {
  @ApiProperty({
    description: '사용자의 ID',
  })
  id: number;

  @ApiProperty({
    description: '사용자의 이메일',
  })
  email: string;

  @ApiProperty({
    description: '사용자의 닉네임',
  })
  nickname: string;

  @ApiProperty({
    description: '사용자의 프로필 이미지',
  })
  imageUrl: string;

  @ApiProperty({
    description: '사용자의 산책메이트 여부',
  })
  canWalkingMate: boolean;
}

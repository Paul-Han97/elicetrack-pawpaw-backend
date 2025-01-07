import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class LoginKakaoRedirectQueryDto {
  @ApiProperty({
    description: '토큰 받기 요청에 필요한 인가 코드',
    required: false,
  })
  @IsOptional()
  code: string;

  @ApiProperty({
    description: '인증 실패시 반환되는 에러 코드',
    required: false,
  })
  @IsOptional()
  error: string;

  @ApiProperty({
    description: '인증 실패시 반환되는 에러 메시지',
    required: false,
  })
  @IsOptional()
  error_description: string;

  @ApiProperty({
    description: '요청시 전달한 state 값과 동일한 값값',
    required: false,
  })
  @IsOptional()
  state: string;
}

export class KakaoLoginDto {
  id: number;
  email: string;
  nickname: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

class UserResponse {
  @ApiProperty({
    description: '사용자의 ID',
  })
  id: number;

  @ApiProperty({
    description: '사용자의 권한',
  })
  role: string;

  @ApiProperty({
    description: '산책메이트 기능 상태'
  })
  canWalkingMate: boolean;

  @ApiProperty({
    description: '사용자의 닉네임'
  })
  nickname: string;
}

export class LoginDto {
  @ApiProperty({
    description: '사용자의 계정',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '사용자의 패스워드',
  })
  @IsStrongPassword()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: '사용자의 ID',
    type: UserResponse,
  })
  @Type(() => UserResponse)
  user: UserResponse;
}

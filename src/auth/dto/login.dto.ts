import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: '사용자의 계정',
  })
  @IsEmail()
  username: string;

  @ApiProperty({
    description: '사용자의 패스워드',
  })
  @IsStrongPassword()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: '사용자의 ID',
  })
  userId: number;
}

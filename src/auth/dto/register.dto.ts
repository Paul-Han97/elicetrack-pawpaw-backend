import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, Max, Min } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: '사용자의 프로필 이미지',
  })
  image: Express.Multer.File;

  @ApiProperty({
    description: '사용자의 이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '사용자의 비밀번호',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: '사용자의 이름',
  })
  @IsString()
  @Min(1)
  @Max(30)
  name: string;

  @ApiProperty({
    description: '사용자의 닉네임',
  })
  @IsString()
  @Min(1)
  @Max(30)
  nickname: string;
}

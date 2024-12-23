import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: '산책메이트 ON/OFF 여부',
  })
  walkMate: boolean;

  @ApiProperty({
    description: '사용자의 닉네임',
  })
  nickname: string;

  @ApiProperty({
    description: '사용자의 현재 비밀번호',
  })
  password: string;
}

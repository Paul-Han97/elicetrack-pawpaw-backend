import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;

  @ApiProperty({
    description: '산책메이트 ON/OFF 여부',
    required: false,
  })
  walkMate: boolean;

  @ApiProperty({
    description: '사용자의 닉네임',
    required: false,
  })
  nickname: string;

  @ApiProperty({
    description: '사용자의 현재 비밀번호',
    required: false,
  })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;

  @ApiProperty({
    description: '산책메이트 ON/OFF 여부',
    required: false,
  })
  canWalkingMate: boolean;

  @ApiProperty({
    description: '사용자의 닉네임',
    required: false,
  })
  nickname: string;

  @ApiProperty({
    description: '사용자의 현재 비밀번호 (변경 시 필요)',
    required: false,
  })
  password: string;

  @ApiProperty({
    description: '사용자의 새로운 비밀번호 (변경 시 필요)',
    required: false,
  })
  newPassword: string

  id:number
}

export class UpdateUserResponseDto{
  @ApiProperty({
    description: '사용자의 ID',
  })
  id:number
}
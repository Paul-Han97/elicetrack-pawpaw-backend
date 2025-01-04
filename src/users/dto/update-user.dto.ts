import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;

  @ApiProperty({
    description: '산책메이트 ON/OFF 여부',
    required: false,
  })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    return value === 'true' || value === true;
  })
  @IsOptional()
  canWalkingMate: boolean;

  @ApiProperty({
    description: '사용자의 닉네임',
    required: false,
  })
  @IsString()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  nickname: string;

  @ApiProperty({
    description: '사용자의 현재 비밀번호 (변경 시 필요)',
    required: false,
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: '사용자의 새로운 비밀번호 (변경 시 필요)',
    required: false,
  })
  @IsStrongPassword()
  newPassword: string;

  id: number;
}

export class UpdateUserResponseDto {
  @ApiProperty({
    description: '사용자의 ID',
  })
  id: number;
}

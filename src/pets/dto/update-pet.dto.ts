import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: '반려동물의 이미지',
  })
  image: Express.Multer.File;

  @ApiProperty({
    description: '반려동물 이름',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: '반려동물 나이',
    required: false,
  })
  age: number;

  @ApiProperty({
    description: '반려동물 성격',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: '반려동물 성별',
    required: false,
  })
  gender: string;

  @ApiProperty({
    description: '반려동물 크기',
    required: false,
  })
  size: string;
}

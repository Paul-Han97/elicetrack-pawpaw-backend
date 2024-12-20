import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;

  @ApiProperty({
    description: '반려동물 이름',
  })
  name: string;

  @ApiProperty({
    description: '반려동물 나이',
  })
  age: number;

  @ApiProperty({
    description: '반려동물 성격',
  })
  description: string;

  @ApiProperty({
    description: '반려동물 성별',
  })
  gender: string;

  @ApiProperty({
    description: '반려동물 크기',
  })
  size: string;

  @ApiProperty({
    description: '반려동물 이미지 URL',
  })
  imageUrl: string;
}

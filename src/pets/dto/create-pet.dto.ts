import { ApiProperty } from '@nestjs/swagger';
import { GENDER_TYPE, PET_SIZE_TYPE } from 'src/common/constants';

export class CreatePetDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: '반려동물의 이미지',
  })
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
    enum: GENDER_TYPE,
  })
  gender: GENDER_TYPE;

  @ApiProperty({
    description: '반려동물 크기',
    enum: PET_SIZE_TYPE,
  })
  size: PET_SIZE_TYPE;

  userId:number
}

export class CreatePetResponseDto {
  @ApiProperty({
    description: '반려동물 ID',
  })
  id: number;
}

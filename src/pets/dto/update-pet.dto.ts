import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsByteLength, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { GENDER_TYPE, PET_SIZE_TYPE } from 'src/common/constants';

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
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @IsOptional()
  name: string;

  @ApiProperty({
    description: '반려동물 나이',
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  age: number;

  @ApiProperty({
    description: '반려동물 성격',
    required: false,
  })
  @IsString()
  @IsByteLength(0, 300)
  @IsOptional()
  description: string;

  @ApiProperty({
    description: '반려동물 성별',
    required: false,
    enum: GENDER_TYPE,
  })
  @IsEnum(GENDER_TYPE)
  @IsOptional()
  gender: GENDER_TYPE;

  @ApiProperty({
    description: '반려동물 크기',
    required: false,
    enum: PET_SIZE_TYPE,
  })
  @IsEnum(PET_SIZE_TYPE)
  @IsOptional()
  size: PET_SIZE_TYPE;

  userId:number

  id:number
}

export class UpdatePetResponseDto{
  @ApiProperty({
    description: '반려동물 ID',
  })
  id: number;
}
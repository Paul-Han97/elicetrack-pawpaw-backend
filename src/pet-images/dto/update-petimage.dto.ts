import { PartialType } from '@nestjs/swagger';
import { CreatePetimageDto } from './create-petimage.dto';

export class UpdatePetimageDto extends PartialType(CreatePetimageDto) {}

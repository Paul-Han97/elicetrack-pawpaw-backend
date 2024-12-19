import { PartialType } from '@nestjs/swagger';
import { CreateUserimageDto } from './create-userimage.dto';

export class UpdateUserimageDto extends PartialType(CreateUserimageDto) {}

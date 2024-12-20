import { PartialType } from '@nestjs/swagger';
import { CreateBoardimageDto } from './create-boardimage.dto';

export class UpdateBoardimageDto extends PartialType(CreateBoardimageDto) {}

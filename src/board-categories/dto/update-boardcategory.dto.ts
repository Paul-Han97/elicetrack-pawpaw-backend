import { PartialType } from '@nestjs/swagger';
import { CreateBoardcategoryDto } from './create-boardcategory.dto';

export class UpdateBoardcategoryDto extends PartialType(CreateBoardcategoryDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateUserlocationDto } from './create-userlocation.dto';

export class UpdateUserlocationDto extends PartialType(CreateUserlocationDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateUserboardlikeDto } from './create-userboardlike.dto';

export class UpdateUserboardlikeDto extends PartialType(CreateUserboardlikeDto) {}

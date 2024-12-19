import { PartialType } from '@nestjs/swagger';
import { CreatePlacelocationDto } from './create-placelocation.dto';

export class UpdatePlacelocationDto extends PartialType(CreatePlacelocationDto) {}

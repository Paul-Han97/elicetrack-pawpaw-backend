import { Controller, Inject } from '@nestjs/common';
import { IPetService } from './interfaces/pet.service.interface';
import { PetService } from './pet.service';

@Controller('pets')
export class PetController {
  constructor(
    @Inject(PetService)
    private readonly petService: IPetService,
  ) {}
}

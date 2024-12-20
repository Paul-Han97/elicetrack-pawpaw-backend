import { Controller, Inject } from '@nestjs/common';
import { IPetSizeService } from './interfaces/pet-size..service.interface';
import { PetSizeService } from './pet-size..service';

@Controller('pet-sizes')
export class PetSizeController {
  constructor(
    @Inject(PetSizeService)
    private readonly petSizeService: IPetSizeService,
  ) {}
}
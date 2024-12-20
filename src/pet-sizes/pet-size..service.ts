import { Inject, Injectable } from '@nestjs/common';
import { IPetSizeRepository } from './interfaces/pet-size..repository.interface';
import { IPetSizeService } from './interfaces/pet-size..service.interface';
import { PetSizeRepository } from './pet-size..repository';

@Injectable()
export class PetSizeService implements IPetSizeService {
  constructor(
    @Inject(PetSizeRepository)
    private readonly petSizeRepository: IPetSizeRepository,
  ) {}
}

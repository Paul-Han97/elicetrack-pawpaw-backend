import { Inject, Injectable } from '@nestjs/common';
import { IPetRepository } from './interfaces/pet.repository.interface';
import { IPetService } from './interfaces/pet.service.interface';
import { PetRepository } from './pet.repository';

@Injectable()
export class PetService implements IPetService {
  constructor(
    @Inject(PetRepository)
    private readonly petRepository: IPetRepository,
  ) {}
}

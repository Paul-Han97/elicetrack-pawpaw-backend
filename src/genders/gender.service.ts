import { Inject, Injectable } from '@nestjs/common';
import { IGenderRepository } from './interfaces/gender.repository.interface';
import { IGenderService } from './interfaces/gender.service.interface';
import { GenderRepository } from './gender.repository';

@Injectable()
export class GenderService implements IGenderService {
  constructor(
    @Inject(GenderRepository)
    private readonly genderRepository: IGenderRepository,
  ) {}
}

import { Inject, Injectable } from '@nestjs/common';
import { CreatePetimageDto } from './dto/create-petimage.dto';
import { UpdatePetimageDto } from './dto/update-petimage.dto';
import { PetImageRepository } from './petimage.repository';
import { IPetImageRepository } from './interface/petimage.repository';

@Injectable()
export class PetImageService {
  constructor(
    @Inject(PetImageRepository)
    private readonly petImageRepository: IPetImageRepository,
  ) {}
}

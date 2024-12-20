import { Inject, Injectable } from '@nestjs/common';
import { CreatePetimageDto } from './dto/create-petimage.dto';
import { UpdatePetimageDto } from './dto/update-petimage.dto';
import { PetImageRepository } from './pet-image.repository';
import { IPetImageRepository } from './interface/petimage.repository';
import { IPetImageService } from './interface/petimage.service.interface';

@Injectable()
export class PetImageService implements IPetImageService {
  constructor(
    @Inject(PetImageRepository)
    private readonly petImageRepository: IPetImageRepository,
  ) {}
}

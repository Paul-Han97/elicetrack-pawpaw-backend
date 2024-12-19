import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import { CreatePetimageDto } from './dto/create-petimage.dto';
import { UpdatePetimageDto } from './dto/update-petimage.dto';
import { PetImageService } from './petimage.service';
import { IPetImageService } from './interface/petimage.service.interface';

@Controller('petimage')
export class PetImageController {
  constructor(
    @Inject(PetImageService)
    private readonly petImageService: IPetImageService,
  ) {}
}

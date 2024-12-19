import { Inject, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceRepository } from './place.repository';
import { IPlaceRepository } from './interface/place.repository.interface';

@Injectable()
export class PlaceService {
  constructor(
    @Inject(PlaceRepository)
    private readonly placeRepository: IPlaceRepository,
  ) {}
}

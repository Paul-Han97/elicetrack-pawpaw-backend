import { Inject, Injectable } from '@nestjs/common';
import { PlaceRepository } from './place.repository';
import { IPlaceRepository } from './interface/place.repository.interface';
import { IPlaceService } from './interface/place.service.interface';

@Injectable()
export class PlaceService implements IPlaceService {
  constructor(
    @Inject(PlaceRepository)
    private readonly placeRepository: IPlaceRepository,
  ) {}
}

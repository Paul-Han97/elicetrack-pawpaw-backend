import { Inject, Injectable } from '@nestjs/common';
import { CreatePlacelocationDto } from './dto/create-placelocation.dto';
import { UpdatePlacelocationDto } from './dto/update-placelocation.dto';
import { PlaceLocationRepository } from './place-location.repository';
import { IPlaceLocationRepository } from './interface/place-location.repository.interface';
import { IPlaceLocationService } from './interface/place-location.service.interface';

@Injectable()
export class PlaceLocationService implements IPlaceLocationService {
  @Inject(PlaceLocationRepository)
  private readonly placeLocationRepository: IPlaceLocationRepository;
}

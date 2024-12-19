import { Inject, Injectable } from '@nestjs/common';
import { CreatePlacelocationDto } from './dto/create-placelocation.dto';
import { UpdatePlacelocationDto } from './dto/update-placelocation.dto';
import { PlaceLocationRepository } from './placelocation.repository';
import { IPlaceLocationRepository } from './interface/placelocation.repository.interface';

@Injectable()
export class PlaceLocationService {
  @Inject(PlaceLocationRepository)
  private readonly placeLocationRepository: IPlaceLocationRepository;
}

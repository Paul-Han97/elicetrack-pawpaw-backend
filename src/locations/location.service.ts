import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationRepository } from './location.repository';
import { ILocationRepository } from './interface/location.repository.interface';
import { ILocationService } from './interface/location.service.interface';

@Injectable()
export class LocationService implements ILocationService {
  constructor(
    @Inject(LocationRepository)
    private readonly locationRepository: ILocationRepository,
  ) {}
}

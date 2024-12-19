import { Repository } from 'typeorm';
import { PlaceLocation } from '../entities/place-location.entity';

export interface IPlaceLocationRepository extends Repository<PlaceLocation> {}

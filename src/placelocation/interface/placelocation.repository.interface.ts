import { Repository } from 'typeorm';
import { PlaceLocation } from '../entities/placelocation.entity';

export interface IPlaceLocationRepository extends Repository<PlaceLocation> {}

import { Repository } from 'typeorm';
import { Place } from '../entities/place.entity';

export interface IPlaceRepository extends Repository<Place> {}

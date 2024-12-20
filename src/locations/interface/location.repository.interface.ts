import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';

export interface ILocationRepository extends Repository<Location> {}

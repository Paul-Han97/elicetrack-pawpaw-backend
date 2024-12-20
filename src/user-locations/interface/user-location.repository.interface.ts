import { Repository } from 'typeorm';
import { UserLocation } from '../entities/user-location.entity';

export interface IUserLocationRepository extends Repository<UserLocation> {}

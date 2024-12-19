import { Repository } from 'typeorm';
import { UserLocation } from '../entities/userlocation.entity';

export interface IUserLocationRepository extends Repository<UserLocation> {}

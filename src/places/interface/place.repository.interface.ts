import { Repository } from 'typeorm';
import { Place } from '../entities/place.entity';

export interface IPlaceRepository extends Repository<Place> {
  saveEntities(entities: Place[]): Promise<void>;

  findNearbyPlaces(lat: number, lon: number, radius: number): Promise<Place[]>;

  findByPlace(id: number): Promise<Place | null>;
}

import { Repository } from 'typeorm';
import { Place } from '../entities/place.entity';

export interface IPlaceRepository extends Repository<Place> {
  saveEntities(entities: Place[]): Promise<void>;

  findNearbyPlaces(
    lon: number,
    lat: number,
    radius: number,
    category?: string,
  ): Promise<Place[]>;

  findByPlace(id: number): Promise<Place | null>;

  getPlaceWithReviews(id: number): Promise<Place | null>;
}

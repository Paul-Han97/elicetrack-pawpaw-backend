import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { IPlaceRepository } from './interface/place.repository.interface';
import { Review } from 'src/reviews/entities/review.entity';

@CustomRepository(Place)
export class PlaceRepository
  extends Repository<Place>
  implements IPlaceRepository
{
  async saveEntities(entities: Place[]): Promise<void> {
    try {
      await this.createQueryBuilder()
        .insert()
        .into(Place)
        .values(entities)
        .orUpdate(
          ['name', 'postalCode', 'roadNameAddress', 'contact', 'lastUpdate'],
          ['id'],
        )
        .execute();
    } catch (e) {
      throw new Error(`실패입니다 임시예요:${e.message}`);
    }
  }
  async findNearbyPlaces(
    lon: number,
    lat: number,
    radius: number,
  ): Promise<Place[]> {
    try {
      return await this.createQueryBuilder('place')

        .innerJoin('place.placeLocation', 'placeLocation')
        .innerJoin('placeLocation.location', 'location')
        .where(
          'ST_Distance_Sphere(location.point, POINT(:lon, :lat)) < :radius',

          {
            lon,
            lat,
            radius,
          },
        )
        .getMany();
    } catch (e) {
      throw new Error(`근처 장소 조회 실패: ${e.message}`);
    }
  }

  async findByPlace(id: number): Promise<Place | null> {
    return this.createQueryBuilder('place')
      .innerJoinAndSelect('place.placeLocation', 'placeLocation')
      .innerJoinAndSelect('placeLocation.location', 'location')
      .where('place.id = :id', { id })
      .getOne();
  }

  async findReviewWithDetails(reviewId: number, placeId: number) {
    return await this.createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.place', 'place')
      .leftJoinAndSelect('review.reviewPlaceLike', 'reviewPlaceLike')
      .where('review.id = :reviewId', { reviewId })
      .andWhere('review.place.id = :placeId', { placeId })
      .getOne();
  }
}

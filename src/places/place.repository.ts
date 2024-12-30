import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { IPlaceRepository } from './interface/place.repository.interface';

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
    category?: string,
  ): Promise<Place[]> {
    try {
      return await this.createQueryBuilder('place')

        .leftJoinAndSelect('place.placeLocation', 'placeLocation')
        .leftJoinAndSelect('placeLocation.location', 'location')
        .where(
          'ST_Distance_Sphere(location.point, POINT(:lon, :lat)) < :radius',
          {
            lon,
            lat,
            radius,
          },
        )
        .andWhere(category ? 'place.category = :category' : '1=1', { category })

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
}

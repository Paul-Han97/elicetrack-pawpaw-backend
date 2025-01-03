import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/constants';
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
      throw new BadRequestException(ERROR_MESSAGE.NOT_VALID_REQUEST);
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
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }
  }

  async findByPlace(id: number): Promise<Place | null> {
    return this.createQueryBuilder('place')
      .innerJoinAndSelect('place.placeLocation', 'placeLocation')
      .innerJoinAndSelect('placeLocation.location', 'location')
      .where('place.id = :id', { id })
      .getOne();
  }

  async getPlaceWithReviews(id: number): Promise<Place | null> {
    try {
      return this.createQueryBuilder('place')
        .leftJoinAndSelect('place.review', 'review')
        .leftJoinAndSelect('review.user', 'user')
        .leftJoinAndSelect('review.reviewPlaceLike', 'reviewPlaceLike')
        .leftJoinAndSelect('user.userImage', 'userImage')
        .leftJoinAndSelect('userImage.image', 'image')
        .where('place.id = :id', { id })
        .getOne();
    } catch (e) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }
  }
}

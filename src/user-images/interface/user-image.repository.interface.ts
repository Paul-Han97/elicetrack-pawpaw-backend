import { Repository } from 'typeorm';
import { UserImage } from '../entities/user-image.entity';

export interface IUserImageRepository extends Repository<UserImage> {}

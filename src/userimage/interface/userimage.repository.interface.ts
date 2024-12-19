import { Repository } from 'typeorm';
import { UserImage } from '../entities/userimage.entity';

export interface IUserImageRepository extends Repository<UserImage> {}

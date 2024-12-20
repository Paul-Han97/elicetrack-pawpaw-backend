import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';

export interface IImageRepository extends Repository<Image> {}

import { Repository } from 'typeorm';
import { PetImage } from '../entities/petimage.entity';

export interface IPetImageRepository extends Repository<PetImage> {}

import { Repository } from 'typeorm';
import { PetImage } from '../entities/pet-image.entity';

export interface IPetImageRepository extends Repository<PetImage> {}

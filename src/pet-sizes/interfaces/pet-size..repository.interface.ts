import { Repository } from 'typeorm';
import { PetSize } from '../entities/pet-size.entity';

export interface IPetSizeRepository extends Repository<PetSize> {}

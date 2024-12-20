import { Repository } from 'typeorm';
import { Pet } from '../entities/pet.entity';

export interface IPetRepository extends Repository<Pet> {}

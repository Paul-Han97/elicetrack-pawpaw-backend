import { Repository } from 'typeorm';
import { BoardCategory } from '../entities/boardcategory.entity';

export interface IBoardCategoryRepository extends Repository<BoardCategory> {}

import { Repository } from 'typeorm';
import { BoardCategory } from '../entities/board-category.entity';

export interface IBoardCategoryRepository extends Repository<BoardCategory> {}

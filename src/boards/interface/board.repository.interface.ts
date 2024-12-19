import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';

export interface IBoardRepository extends Repository<Board> {}

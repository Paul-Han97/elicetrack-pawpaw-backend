import { Board } from 'src/boards/entities/board.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class BoardCategory extends CommonEntity {
    @Column()
    engName: string;

    @Column()
    korName: string;

    @OneToMany(() => Board, (board) => board.boardCategory)
    board: Board[];
}

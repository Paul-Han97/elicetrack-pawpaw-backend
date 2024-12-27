import { Board } from 'src/boards/entities/board.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserBoardLike extends CommonEntity {
  @Column()
  isLikeClicked: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Board)
  @JoinColumn({ referencedColumnName: 'id' })
  board: Board;
}

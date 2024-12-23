import { BoardCategory } from 'src/board-categories/entities/board-category.entity';
import { BoardImage } from 'src/board-images/entities/board-image.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { UserBoardLike } from 'src/user-board-likes/entities/user-board-like.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Board extends CommonEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => BoardCategory)
  @JoinColumn({ referencedColumnName: 'id' })
  boardCategory: BoardCategory;

  @OneToMany(() => BoardImage, (BoardImage) => BoardImage.board)
  boardImage: BoardImage[];

  @OneToMany(() => Comment, (comment) => comment.board)
  comment: Comment[];

  @OneToMany(() => UserBoardLike, (userBoardLike) => userBoardLike.board)
  userBoardLike: UserBoardLike[];
}

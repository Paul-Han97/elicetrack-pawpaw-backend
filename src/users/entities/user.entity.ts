import { Board } from 'src/boards/entities/board.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Credential } from 'src/credentials/entities/credential.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RoomUser } from 'src/room-user/entities/room-user.entity';
import { UserBoardLike } from 'src/user-board-likes/entities/user-board-like.entity';
import { UserImage } from 'src/user-images/entities/user-image.entity';
import { UserLocation } from 'src/user-locations/entities/user-location.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  canWalkingMate: boolean;

  @ManyToOne(() => Role)
  @JoinColumn({ referencedColumnName: 'id' })
  role: Role;

  @OneToMany(() => Credential, (credential) => credential.user)
  credential: Credential[];

  @OneToMany(() => UserImage, (userImage) => userImage.user)
  userImage: UserImage[];
  
  @OneToMany(() => UserLocation, (userLocation) => userLocation.user)
  userLocation: UserLocation[];

  @OneToMany(() => Pet, (pet) => pet.user)
  pet: Pet[];

  @OneToMany(() => UserBoardLike, (userBoardLike) => userBoardLike.user)
  userBoardLike: UserBoardLike[];

  @OneToMany(() => Board, (board) => board.user)
  board: Board[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notification: Notification[];
  
  @OneToMany(() => Review, (review) => review.user)
  review: Review[];
  
  @OneToMany(() => RoomUser, (roomUser) => roomUser.user)
  roomUser: RoomUser[];
}

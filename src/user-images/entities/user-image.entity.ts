import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserImage extends CommonEntity {
  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Image)
  @JoinColumn({ referencedColumnName: 'id' })
  image: Image;
}

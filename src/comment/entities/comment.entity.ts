import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Entity } from 'typeorm';

@Entity()
export class Comment extends CommonEntity {}

import { ApiProperty } from '@nestjs/swagger';
import { CreateOneDto } from './create-one.dto';

export class UpdateOneDto extends CreateOneDto {}

export class Update {
  @ApiProperty({
    description: '게시글의 ID',
  })
  id: number;
}

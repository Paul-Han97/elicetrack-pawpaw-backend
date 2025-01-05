import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Room {
  @Prop({
    required: true,
    unique: true,
  })
  id: number;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    default: 'PawPaw',
  })
  createdUser: string;

  @Prop({
    required: true,
    default: new Date(),
  })
  createdAt: Date;

  @Prop({
    required: true,
    default: null,
  })
  updatedUser: string;

  @Prop({
    required: true,
    default: new Date(),
  })
  updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

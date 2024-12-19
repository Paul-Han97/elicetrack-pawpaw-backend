import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Room {
  @Prop({
    required: true,
  })
  socketId: string;

  @Prop({
    required: true,
  })
  createdUser: string;

  @Prop({
    required: true,
  })
  createdAt: Date;

  @Prop({
    required: true,
  })
  updatedUser: string;

  @Prop({
    required: true,
  })
  updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

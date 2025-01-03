import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Room } from 'src/rooms/schemas/room.schema';

@Schema()
export class Chat {
  @Prop({
    required: true,
    unique: true,
  })
  id: number

  @Prop({
    required: true,
  })
  senderId: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  })
  room: Room;

  @Prop({
    required: true,
  })
  sendDate: Date;

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

export const ChatSchema = SchemaFactory.createForClass(Chat);

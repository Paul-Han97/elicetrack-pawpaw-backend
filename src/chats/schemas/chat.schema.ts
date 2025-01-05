import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Chat {
  @Prop({
    required: true,
    unique: true,
  })
  id: number;

  @Prop({
    required: true,
  })
  senderId: number;

  @Prop({
    required: true,
  })
  recipientId: number;

  @Prop({
    required: true,
  })
  message: string;

  @Prop({
    required: true,
  })
  roomName: string;

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

  @Prop()
  updatedUser: string;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

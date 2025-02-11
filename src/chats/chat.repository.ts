import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { IChatRepository } from './interfaces/chat.repository.interface';
import { Chat } from './schemas/chat.schema';

@CustomRepository(Chat)
export class ChatRepository implements IChatRepository {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,
  ) {}

  async findById(id: number): Promise<Chat> {
    return await this.chatModel.findOne({ id }).exec();
  }

  async findByRoomName(roomName: string): Promise<Chat> {
    return await this.chatModel
      .findOne({ roomName })
      .sort({ $natural: -1 })
      .exec();
  }

  async createMessage(chat: Chat): Promise<Chat> {
    const newChat = new this.chatModel(chat);
    return await newChat.save();
  }

  async findMessageByRoomName(roomName: string): Promise<Chat[]> {
    return await this.chatModel
      .find({ roomName })
      .sort({ createdAt: 'asc' })
      .exec();
  }
}

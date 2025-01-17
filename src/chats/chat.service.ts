import { Inject, Injectable, Logger } from '@nestjs/common';
import { CounterRepository } from 'src/counters/counter.repository';
import { ICounterRepository } from 'src/counters/interfaces/counter.repository.interface';
import { ChatRepository } from './chat.repository';
import { GetMessageByRoomNameDto } from './dto/get-message-by-room-name.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { IChatRepository } from './interfaces/chat.repository.interface';
import { IChatService } from './interfaces/chat.service.interface';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatService implements IChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @Inject(ChatRepository)
    private readonly chatRepository: IChatRepository,

    @Inject(CounterRepository)
    private readonly counterRepository: ICounterRepository,
  ) {}

  async sendMessage(sendMessageDto: SendMessageDto): Promise<Chat> {
    this.logger.log('sendMessage 시작');
    const { message, recipientId, roomName, senderId } = sendMessageDto;

    const chatId = await this.counterRepository.findAndUpdateSequence(
      Chat.name,
    );

    const chat = new Chat();
    chat.id = chatId;
    chat.isRead = false;
    chat.message = message;
    chat.recipientId = recipientId;
    chat.senderId = senderId;
    chat.roomName = roomName;
    chat.sendDate = new Date();
    chat.createdAt = new Date();
    chat.createdUser = senderId.toString();
    chat.updatedAt = null;
    chat.updatedUser = null;
    chat.deletedAt = null;

    const createdChat = await this.chatRepository.createMessage(chat);

    this.logger.log('sendMessage 종료');
    return createdChat;
  }

  async getMessageByRoomName(getMessageByRoomNameDto: GetMessageByRoomNameDto) {
    const { roomName } = getMessageByRoomNameDto;
    return await this.chatRepository.findMessageByRoomName(roomName);
  }
}

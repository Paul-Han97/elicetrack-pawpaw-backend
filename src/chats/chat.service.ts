import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { SendMessageDto } from './dto/send-message.dto';
import { IChatRepository } from './interfaces/chat.repository.interface';
import { IChatService } from './interfaces/chat.service.interface';
import { Chat } from './schemas/chat.schema';

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @Inject(ChatRepository)
    private readonly chatRepository: IChatRepository,
  ) {}

  async sendMessage(sendMessageDto: SendMessageDto): Promise<Chat> {
    const { message, recipientId, roomName, senderId } = sendMessageDto;

    return;
  }
}

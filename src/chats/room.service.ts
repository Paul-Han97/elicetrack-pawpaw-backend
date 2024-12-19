import { Inject, Injectable } from '@nestjs/common';
import { IChatRepository } from './interfaces/chat.repository.interface';
import { IChatService } from './interfaces/chat.service.interface';
import { ChatRepository } from './room.repository';

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @Inject(ChatRepository)
    private readonly chatRepository: IChatRepository,
  ) {}
}

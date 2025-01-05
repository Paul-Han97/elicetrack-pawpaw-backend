import { Inject, Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { IChatRepository } from './interfaces/chat.repository.interface';
import { IChatService } from './interfaces/chat.service.interface';

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @Inject(ChatRepository)
    private readonly chatRepository: IChatRepository,
  ) {}
}

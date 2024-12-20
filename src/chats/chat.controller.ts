import { Controller, Inject } from '@nestjs/common';
import { IChatService } from './interfaces/chat.service.interface';
import { ChatService } from './room.service';

export class ChatController {
  constructor(
    @Inject(ChatService)
    private readonly chatService: IChatService,
  ) {}
}

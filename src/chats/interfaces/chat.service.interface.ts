import { SendMessageDto } from '../dto/send-message.dto';
import { Chat } from '../schemas/chat.schema';

export interface IChatService {
  sendMessage(sendMessageDto: SendMessageDto): Promise<Chat>;
}

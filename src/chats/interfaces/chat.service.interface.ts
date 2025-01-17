import { GetMessageByRoomNameDto } from '../dto/get-message-by-room-name.dto';
import { SendMessageDto } from '../dto/send-message.dto';
import { Chat } from '../schemas/chat.schema';

export interface IChatService {
  sendMessage(sendMessageDto: SendMessageDto): Promise<Chat>;
  getMessageByRoomName(
    getMessageByRoomNameDto: GetMessageByRoomNameDto,
  ): Promise<Chat[]>;
}

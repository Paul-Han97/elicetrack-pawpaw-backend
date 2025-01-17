import { Chat } from '../schemas/chat.schema';

export interface IChatRepository {
  findById(id: number): Promise<Chat>;
  findByRoomName(roomName: string): Promise<Chat>;
  createMessage(chat: Chat): Promise<Chat>;
  findMessageByRoomName(roomName: string): Promise<Chat[]>
}

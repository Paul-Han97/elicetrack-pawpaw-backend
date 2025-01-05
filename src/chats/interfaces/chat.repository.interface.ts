import { Chat } from '../schemas/chat.schema';

export interface IChatRepository {
  findById(id: number): Promise<Chat>;
}

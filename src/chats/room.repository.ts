import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { Chat } from "./schemas/chat.schema";
import { IChatRepository } from "./interfaces/chat.repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@CustomRepository(Chat)
export class ChatRepository implements IChatRepository {
    constructor(
        @InjectModel(Chat.name)
        private readonly roomModel: Model<Chat>
    ){}
}
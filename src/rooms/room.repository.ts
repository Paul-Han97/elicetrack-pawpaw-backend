import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { Room } from "./schemas/room.schema";
import { IRoomRepository } from "./interfaces/room.repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@CustomRepository(Room)
export class RoomRepository implements IRoomRepository {
    constructor(
        @InjectModel(Room.name)
        private readonly roomModel: Model<Room>
    ){}
}
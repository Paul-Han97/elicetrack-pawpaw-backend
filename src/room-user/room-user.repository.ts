import { CustomRepository } from "src/common/typeorm/typeorm-custom.decorator";
import { RoomUser } from "./entities/room-user.entity";
import { Repository } from "typeorm";
import { IRoomUserRepository } from "./interfaces/room-user.repository.interface";

@CustomRepository(RoomUser)
export class RoomUserRepository extends Repository<RoomUser> implements IRoomUserRepository {}
import mongoose, { Model } from 'mongoose';
import { Room } from 'src/Schema/Room.schema';
import { RoomDto } from './dto/room.dto';
import { User } from 'src/Schema/UserSchema';
export declare class UserService {
    private roomModel;
    private userModel;
    constructor(roomModel: Model<Room>, userModel: Model<User>);
    CreateRoom(request: RoomDto): Promise<(mongoose.Document<unknown, {}, Room> & Room & {
        _id: mongoose.Types.ObjectId;
    }) | "User not found." | "Room already exists.">;
}

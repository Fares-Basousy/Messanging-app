import { MessageDto } from './dto/message.dto';
import { Server, Socket } from 'socket.io';
import { RoomDto } from 'src/user/dto/room.dto';
import { Room } from 'src/Schema/Room.schema';
import { Model } from 'mongoose';
import { User } from 'src/Schema/UserSchema';
export declare class MessagesGateway {
    private roomModel;
    private userModel;
    constructor(roomModel: Model<Room>, userModel: Model<User>);
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    newMsg(messageDto: MessageDto): Promise<void>;
    openChat(roomDto: RoomDto): Promise<void>;
}

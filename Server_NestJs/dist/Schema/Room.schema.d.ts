import * as mongoose from 'mongoose';
import { User } from './UserSchema';
import { MessageDto } from 'src/messages/dto/message.dto';
export type RoomDocument = mongoose.HydratedDocument<Room>;
export declare class Room {
    messages: MessageDto[];
    users: User[];
    names: String[];
}
export declare const RoomSchema: mongoose.Schema<Room, mongoose.Model<Room, any, any, any, mongoose.Document<unknown, any, Room> & Room & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Room, mongoose.Document<unknown, {}, Room> & Room & {
    _id: mongoose.Types.ObjectId;
}>;

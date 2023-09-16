import * as mongoose from 'mongoose';
import { Room } from './Room.schema';
export type UserDocument = mongoose.HydratedDocument<User>;
export declare class User {
    name: string;
    email: string;
    password: string;
    rooms: Room[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, User> & User & {
    _id: mongoose.Types.ObjectId;
}>;

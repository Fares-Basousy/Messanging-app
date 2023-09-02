import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './UserSchema';
import { Message } from './Message.Schema';

export type RoomDocument = mongoose.HydratedDocument<Room>;
@Schema({
  toJSON: {
    getters: true,
    transform: function (doc, ret) {
      delete ret.password;
    },
  },
})
export class Room  {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  messages: Message[] = [];

   
  
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User',required:true})
  users: User[];


}
export const RoomSchema = SchemaFactory.createForClass(Room);

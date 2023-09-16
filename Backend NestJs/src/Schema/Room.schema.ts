import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './UserSchema';
import { MessageDto } from 'src/messages/dto/message.dto';
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
  @Prop(  )
  messages: MessageDto[] = [];

   
  
    @Prop({ type: [mongoose.Types.ObjectId], ref: 'User',required:true})
  users: User[];

  @Prop({ type: [String],required:true})
  names: String[];

}
export const RoomSchema = SchemaFactory.createForClass(Room);

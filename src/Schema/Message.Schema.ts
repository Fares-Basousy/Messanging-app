import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Room } from './Room.schema';


export type MessageDocument = mongoose.HydratedDocument<Room>;
@Schema({
  toJSON: {
    getters: true,
    transform: function (doc, ret) {
      delete ret.password;
    },
  },
})
export class Message  {
  @Prop({require : true})
  text: string;

  @Prop({require : true, unique : true})
  sender: string;  
  
  @Prop({require : true})
  reciever: string

  @Prop({type:Date, default: Date.now})
  createdAt: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  room: Room;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

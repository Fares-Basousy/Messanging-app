/*import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Room } from './Room.schema';


export type MessageDocument = mongoose.HydratedDocument<Room>;
@Schema()
export class Message  {
  @Prop({require : true})
  text: string;

  @Prop({require : true})
  sender: string;  
  
  @Prop({type:Date, default: Date.now})
  createdAt: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  room: Room;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
*/
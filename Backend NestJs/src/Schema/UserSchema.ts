import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Room } from './Room.schema';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({
  toJSON: {
    getters: true,
    transform: function (doc, ret) {
      delete ret.password;
    },
  },
})
export class User  {
  @Prop({require : true, unique : true})
  name: string;

  
  @Prop({require : true, unique : true})
  email: string;  
  
  @Prop({require : true})
  password: string

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Room' })
  rooms: Room[] ;


}



export const UserSchema = SchemaFactory.createForClass(User);

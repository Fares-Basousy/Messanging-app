import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer,ConnectedSocket } from '@nestjs/websockets';
import { MessageDto } from './dto/message.dto';
import { Server, Socket} from 'socket.io'
import { RoomDto } from 'src/user/dto/room.dto';
import { Room } from 'src/Schema/Room.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Model } from 'mongoose';
import { User } from 'src/Schema/UserSchema';
@WebSocketGateway( 5000,{
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {

  constructor(@InjectModel(Room.name) private  roomModel: Model<Room>,@InjectModel(User.name) private  userModel: Model<User>) {}

  @WebSocketServer()
  server:Server

  async handleConnection(@ConnectedSocket() client: Socket,) {
    let id : string
    if(Array.isArray(client.handshake.query.id)){
      //which will never trigger
       id = client.handshake.query.id.join('');
    }
    else {
       id = client.handshake.query.id
    }
    const objectId =  new mongoose.Types.ObjectId(id)
    const rooms = await this.roomModel.find({ users: { $in: objectId } })
    rooms.forEach((room) => {
      client.join(room._id.toHexString());
    });
    console.log(rooms)
    client.emit('initialize', {rooms});
  }
  
  @SubscribeMessage('sendmsg')
  async newMsg(@MessageBody() messageDto: MessageDto) {
    const roomid = new mongoose.Types.ObjectId(messageDto.room)
    const room = await this.roomModel.findOneAndUpdate({_id:roomid}, { $push: { messages: messageDto  }},  {returnNewDocument : true})
    //const rooms = await this.roomModel
    this.server.to(room._id.toHexString()).emit('sendmsg', (messageDto)); 
    
  }

  @SubscribeMessage('openchat')
  async openChat(@MessageBody() roomDto:RoomDto) {
    const room = await this.roomModel.findOne({_id:roomDto._id},)
    this.server.to(roomDto._id).emit('openchat', (room.messages));
  }

}
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { MessageDto } from './dto/message.dto';
import { Server, Socket} from 'socket.io'
import { RoomDto } from 'src/user/dto/room.dto';
import { Room } from 'src/Schema/Room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {

  constructor(@InjectModel(Room.name) private  roomModel: Model<Room>,) {}

  @WebSocketServer()
  server:Server

  async handleConnection(client: Socket) {
    const rooms = await this.roomModel.find({ users: { $in: client.id } }).select('_id') 
    rooms.forEach((room) => {
      client.join(room._id.toHexString());
    });
  }


  @SubscribeMessage('sendmsg')
  async newMsg(@MessageBody() messageDto: MessageDto) {
    const room = await this.roomModel.findOneAndUpdate({_id:messageDto.room}, { $push: { messages: messageDto  }},  {returnNewDocument : true})
    this.server.to(room._id.toHexString()).emit('openchat', (room.messages));

  }

  @SubscribeMessage('openchat')
  async openChat(@MessageBody() roomDto:RoomDto) {
    const room = await this.roomModel.findOne({_id:roomDto._id},)
    this.server.to(roomDto._id).emit('openchat', (room.messages));
 

  }

}

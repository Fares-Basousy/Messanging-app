import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { MessageDto } from './dto/message.dto';
import { Server, Socket} from 'socket.io'
import { RoomDto } from 'src/user/dto/room.dto';



@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server:Server

  async handleConnection(client: Socket) {
   await this.handleConnection(client)
  }


  @SubscribeMessage('sendmsg')
  async newMsg(@MessageBody() messageDto: MessageDto) {
    this.server.to(messageDto.room).emit('sendmsg', await this.messagesService.newMsg(messageDto));
  }

  @SubscribeMessage('openchat')
  async findAll(@MessageBody() roomDto:RoomDto) {

    this.server.to(roomDto._id).emit('openchat', await this.messagesService.findAll(roomDto));

  }

}

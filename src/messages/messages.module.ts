import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { UserSchema, User } from 'src/Schema/UserSchema';
import { RoomSchema, Room } from 'src/Schema/Room.schema';
import { MessageSchema, Message} from 'src/Schema/Message.Schema'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([
    {name: User.name, schema: UserSchema },
    {name: Message.name, schema: MessageSchema }, 
    {name:Room.name, schema: RoomSchema }])],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}

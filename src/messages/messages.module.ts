import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { UserSchema, User } from 'src/Schema/UserSchema';
import { RoomSchema, Room } from 'src/Schema/Room.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([
    {name: User.name, schema: UserSchema },
    {name:Room.name, schema: RoomSchema }])],
  providers: [MessagesGateway],
})
export class MessagesModule {}

import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from 'src/Schema/Room.schema';
import { Model } from 'mongoose';
import { User } from 'src/Schema/UserSchema';
import { RoomDto } from 'src/user/dto/room.dto';
@Injectable()
export class MessagesService {

  constructor(@InjectModel(Room.name) private  roomModel: Model<Room>, @InjectModel(User.name) private  userModel: Model<User>) {}

  async handleConnection(client) {
    const rooms = await this.roomModel.find({ users: { $in: client.id } }).select('_id') 
    rooms.forEach((room) => {
      client.join(room);
    });
   }

  async newMsg(messageDto: MessageDto) {

    const room = await this.roomModel.findOneAndUpdate({_id:messageDto.room}, { $push: { messages: messageDto  }})


    return await room;
  }

  async findAll(roomDto:RoomDto) {
    const room = await this.roomModel.findOne({_id:roomDto._id},)
    return room.messages

  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}

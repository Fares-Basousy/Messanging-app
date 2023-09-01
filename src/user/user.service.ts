import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from 'src/Schema/Room.schema';
import { Message } from 'src/Schema/Message.Schema';
import { RoomDto } from './dto/room.dto';
import { User } from 'src/Schema/UserSchema';

@Injectable()
export class UserService {
    constructor(@InjectModel(Room.name) private  roomModel: Model<Room>, @InjectModel(User.name) private  userModel: Model<User>) {}

    async getRooms(user : any):Promise <Room[]>
    {   const userId = user.id
        const rooms = await this.roomModel.find({ users: { $in: userId } })
        return rooms
    }

    async getChat(roomid):Promise <Message[]>
    {           
      const room = await this.roomModel.findOne({id:roomid})
      return room.messages

    }
    async CreateRoom(request:RoomDto)
    {
    if (!this.roomModel.exists({users: { $all: [request.user1,request.user2] }})) {
        return "Room already exists"
            }
    else{          
        const room = new this.roomModel({users:[request.user1,request.user2]});
        room.save()
        this.userModel.updateOne({id:request.user1},{$push:{rooms:room}})
        this.userModel.updateOne({id:request.user2},{$push:{rooms:room}})
        }
    }
}

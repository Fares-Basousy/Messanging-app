import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from 'src/Schema/Room.schema';
import { Message } from 'src/Schema/Message.Schema';
import { RoomDto } from './dto/room.dto';
import { User } from 'src/Schema/UserSchema';
import * as mongoose from 'mongoose';

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
        const u1 = (await this.userModel.findOne({name:request.user1}).select("_id"))
        const u2 = (await this.userModel.findOne({name:request.user2}).select("_id"))
        
        console.log("u1")

        if (!this.roomModel.exists({users: { $all: [u1,u2] }})) {
            return "Room already exists"
                }
        else{
            console.log(u2)
            console.log("break")
            const room = new this.roomModel({users: [u1._id, u2._id] });
            room.save()
            this.userModel.updateOne({id:u1._id.toHexString()},{$push:{rooms:room}})
            this.userModel.updateOne({id:u2._id.toHexString()},{$push:{rooms:room}})
            }
        }
}

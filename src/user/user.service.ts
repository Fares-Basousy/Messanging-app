import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from 'src/Schema/Room.schema';
import { RoomDto } from './dto/room.dto';
import { User } from 'src/Schema/UserSchema';
import { Request } from 'express';

@Injectable()
export class UserService {
    constructor(@InjectModel(Room.name) private  roomModel: Model<Room>, @InjectModel(User.name) private  userModel: Model<User>) {}
    
    async getRooms(req : Request):Promise <Room[]>

    {  
        console.log(req)
        const userId = await this.userModel.findOne({name:req.query.user}).select("_id")
        console.log(userId)
        const rooms = await this.roomModel.find({ users: { $in: userId } })
        console.log(rooms)
        return rooms
    }

   /* async getChat(roomid):Promise <Message[]>
    {           
      const room = await this.roomModel.findOne({id:roomid})
      return room.messages

    }*/
    async CreateRoom(request:RoomDto)

    {
        const u1 = await this.userModel.findOne({name:request.user1.toLocaleLowerCase()}).select("_id")
        const u2 = await this.userModel.findOne({name:request.user2.toLocaleLowerCase()}).select("_id")
        
        if (!await this.roomModel.exists({users: { $all: [u1._id,u2._id] }})) {
            return "Room already exists"
                }
        else{
            const room = new this.roomModel({users: [u1._id, u2._id] });
            room.save()
            await this.userModel.updateOne({_id:u1._id},{$push:{rooms:room._id}})
            await this.userModel.updateOne({_id:u2._id},{$push:{rooms:room._id}})
            return room
            
        }
        }
}

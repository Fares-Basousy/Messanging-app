import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from 'src/Schema/Room.schema';
import { RoomDto } from './dto/room.dto';
import { User } from 'src/Schema/UserSchema';

@Injectable()
export class UserService {
    constructor(@InjectModel(Room.name) private  roomModel: Model<Room>, @InjectModel(User.name) private  userModel: Model<User>) {}
    
   

    async CreateRoom(request:RoomDto)

    {   const user1Id = await new mongoose.Types.ObjectId(request.user1)

        const u1 = await this.userModel.findOne({_id:user1Id})
        const u2 = await this.userModel.findOne({name:request.user2})
        console.log(u1)
        if(u2==null){
            return "User not found."
        }
        else if (await this.roomModel.exists({users: { $all: [u1._id,u2._id] }})) {
            return "Room already exists."
                }
        else{
            const room = new this.roomModel({users: [u1._id, u2._id],names:[u1.name,u2.name] });
            room.save()
            await this.userModel.updateOne({_id:u1._id},{$push:{rooms:room._id}})
            await this.userModel.updateOne({_id:u2._id},{$push:{rooms:room._id}})
            return room
            
        }
        }
}

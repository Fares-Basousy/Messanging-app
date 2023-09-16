import {IsNotEmpty} from "class-validator" 
import * as mongoose from 'mongoose'
export class RoomDto {
    
    _id:string
    
    @IsNotEmpty()
    user1 : string

    @IsNotEmpty()
    user2 : string

    
}
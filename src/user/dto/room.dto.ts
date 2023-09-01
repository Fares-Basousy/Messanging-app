import {IsNotEmpty} from "class-validator" 

export class RoomDto {
    
    _id:string
    
    @IsNotEmpty()
    user1 : string

    @IsNotEmpty()
    user2 : string

    
}
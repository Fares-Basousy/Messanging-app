import {IsNotEmpty} from "class-validator" 

export class RoomDto {
    
    @IsNotEmpty()
    user1 : string

    @IsNotEmpty()
    user2 : string

    
}
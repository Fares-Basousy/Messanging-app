import {Length, IsNotEmpty} from "class-validator" 

export class MessageDto {
    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    @Length(1,690)
    sender : string

    @IsNotEmpty()
    room :string

    date: Date = new Date()
}
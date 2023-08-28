import { IsEmail,Length, IsNotEmpty} from "class-validator" 

export class AuthDto {
    
    @IsNotEmpty()
    @Length(3,25)
    name : string

    @IsEmail()
    @IsNotEmpty()
    email : string
    
    
    
    @IsNotEmpty()
    @Length(7,20)
    password : string
}
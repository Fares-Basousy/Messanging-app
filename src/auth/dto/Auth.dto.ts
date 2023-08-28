import { IsEmail,Length, IsNotEmpty} from "class-validator" 

export class AuthDto {
            
    @IsEmail()
    @IsNotEmpty()
    email : string
    
    @IsNotEmpty()
    @Length(3,25)
    name : string
    
    @IsNotEmpty()
    @Length(7,20)
    password : string
}
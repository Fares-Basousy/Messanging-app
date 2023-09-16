import { IsEmail,Length, IsNotEmpty,Min} from "class-validator" 

export class AuthDto {
    
    @IsNotEmpty()
    @Length(3,25)
    name : string

    @IsEmail()
    @IsNotEmpty()
    email : string
    
    
    
    @IsNotEmpty()
    @Length(7,50)
    password : string
}
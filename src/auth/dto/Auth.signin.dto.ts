import { IsEmail,Length, IsNotEmpty} from "class-validator" 

export class SigninAuthDto {
    
  
    @IsEmail()
    @IsNotEmpty()
    email : string
    
    
    
    @IsNotEmpty()
    @Length(7,20)
    password : string
}
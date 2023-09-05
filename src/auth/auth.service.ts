import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/Auth.dto';
import * as argon from 'argon2'
import { User } from 'src/Schema/UserSchema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private  userModel: Model<User> , private jwt: JwtService,private config : ConfigService) {}

  async signup(dto:AuthDto):Promise<User> {

    const hash = await  argon.hash(dto.password);
    const createdUser = new this.userModel({name:dto.name.toLocaleLowerCase(), password:hash, email: dto.email.toLocaleLowerCase()});
    createdUser.save();
    return createdUser

}
async signin(dto:AuthDto):Promise<{access_token: string}> {

  const user = await this.userModel.findOne({ email: dto.email.toLocaleLowerCase() });

  if(!user){
    throw new ForbiddenException('Credentionals incorrect')
  }
    const ps = await argon.verify(await user.password,dto.password)
  
  if(!ps){
    throw new ForbiddenException('Incorrect password')
  }
  return  this.signinToken(user.id.toLocaleLowerCase(),user.email.toLocaleLowerCase())
}

secret  = this.config.get('jwtPass')

async signinToken (userId:number,email:string){
  const payloud ={sub:  userId,email}
  
  const token = await  this.jwt.signAsync(payloud,{
    expiresIn: '15min',
    secret: this.secret
  })
  return {access_token : token}
}

}

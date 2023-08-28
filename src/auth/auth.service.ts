import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/Auth.dto';
import * as argon from 'argon2'
import { User } from 'src/Scheema/UserScheema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private  userModel: Model<User>) {}

  async signup(dto:AuthDto):Promise<User> {

    const hash = await  argon.hash(dto.password);
    const createdUser = new this.userModel({name:dto.name, password:hash, email: dto.email});
    createdUser.save();
    return createdUser

}
}

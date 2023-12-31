
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/Schema/UserSchema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(config:ConfigService, @InjectModel(User.name) private  userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      igonoreExpiration:false,
      secretOrKey: config.get('jwtPass'),
    });
  }

  async validate(payload: any) {
    const objectId = new mongoose.Types.ObjectId(payload.sub)
    const user = await this.userModel.findOne({ _id: objectId })
    delete user.password
    return user;
  }
}


import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/Scheema/UserScheema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(config:ConfigService, @InjectModel(User.name) private  userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwtPass'),
    });
  }

  async validate(payload: any) {
    console.log(payload)
    const user = await this.userModel.findOne({ email: payload.email })
    delete user.password
    return user;
  }
}

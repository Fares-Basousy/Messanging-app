import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/Auth.dto';
import * as argon from 'argon2';
import { User } from 'src/Schema/UserSchema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SigninAuthDto } from './dto/Auth.signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    if(await  this.userModel.exists({user:dto.name})){
      
      throw new ForbiddenException("Name Already Taken.");

      
    }
    else if(await  this.userModel.exists({email:dto.email})){
  
      throw new ForbiddenException("Email Already Taken.");

    }
    const createdUser = new this.userModel({
      name: dto.name.toLocaleLowerCase(),
      password: hash,
      email: dto.email.toLocaleLowerCase(),
    });
    createdUser.save();
    return createdUser;
  }
  async signin(dto: SigninAuthDto): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({
      email: dto.email.toLocaleLowerCase(),
    });

    if (!user) {
      throw new ForbiddenException('Credentionals incorrect');
    }
    const ps = await argon.verify(await user.password, dto.password);

    if (!ps) {
      throw new ForbiddenException('Incorrect password');
    }
    return this.signinToken(
      user._id.toHexString(),
      user.name.toLocaleLowerCase(),
    );
  }

  secret = this.config.get('jwtPass');

  async signinToken(userId: string, name: string) {
    const payloud = { sub: userId, name};

    const token = await this.jwt.signAsync(payloud, {
      expiresIn: `1d`,
      secret: this.secret,
    });
    return { access_token: token };
  }
}

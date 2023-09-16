import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User,UserSchema } from 'src/Schema/UserSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
    imports : [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),JwtModule.register({}),],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy]
})
export class AuthModule {}

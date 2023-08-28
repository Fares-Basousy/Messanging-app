import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User,UserSchema } from 'src/Scheema/UserScheema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports : [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}

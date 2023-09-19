import {  Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoomDto } from './dto/room.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (private userService: UserService){}

  
   
    @UseGuards(AuthGuard('jwt'))
    @Post('createchat')
    createChat(@Body() dto:RoomDto){
        return this.userService.CreateRoom(dto)
    }
}
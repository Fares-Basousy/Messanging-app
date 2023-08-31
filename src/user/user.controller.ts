import {  Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RoomDto } from './dto/room.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor (private userService: UserService){}



    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getRooms(@Req() req : Request){
       return this.userService.getRooms(req.user)
 
        
    }
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getChat(@Param('id') chat :string,@Req() req:Request){
       return {chat:this.userService.getChat(chat), req:req}}

    @UseGuards(AuthGuard('jwt'))
    @Post('createChat')
    createChat(@Body() dto:RoomDto){
        return this.userService.CreateRoom(dto)
    }

}

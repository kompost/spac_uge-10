import { Controller, Get, Param } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import {  } from '@prisma/client';

@Controller('hello-world')
export class ChatroomController {
    constructor(private readonly service: ChatroomService) { }

    @Get(':id')
    async getAllMessages(@Param('id') id:string){
        const chatroom = await this.service.getChatroom(id)
        // chatroom.messages
        console.log(chatroom.messages)
    }
}

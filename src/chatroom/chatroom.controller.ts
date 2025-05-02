import { Controller, Get, Param } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import {  } from '@prisma/client';

@Controller('hello-world')
export class ChatroomController {
    constructor(private readonly service: ChatroomService) { }

    @Get(':id')
    getAllMessages(@Param('id') id:string){
        this.service.getAllMessages(id)
    }
}

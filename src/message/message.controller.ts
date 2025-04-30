import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';

@Controller('message')
export class MessageController {

    constructor(private readonly service: MessageService) { }

    @Get('test')
    getHello() {
        var tmp: Message = {
            id: "test",
            userId: "cma3ts3nl0000vo9cj42uh6c6",
            chatroomId: "234",
            createdAt: new Date(),
            message: "hello"
        }
        return tmp
    }

    @Get(':id')
    getById(@Param() params: any) : Message {
        console.log(params.id)
        return this.service.getById(params.id)
    }

    @Get()
    getAll() : [] {
        return this.service.getAll();
    }
}
class testObject {
    id: string
    name: string
}

import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private readonly hello: MessageService) { }

    @Get('test')
    getHello() {
        var tmp : testObject =  {
            id: "test",
            name: "hello"
        }
        return tmp
    }

    @Get(':id')
    getById(@Param() params: any) {
        console.log(`id: ${params.id}`)
    }
}
class testObject {
    id: string
    name: string
}

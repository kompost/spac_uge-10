import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {

    constructor(private readonly service: MessageService) { }

    @Get('test')
    getHello() {
        var tmp: testObject = {
            id: "test",
            name: "hello"
        }
        return tmp
    }

    @Get(':id')
    getById(@Param() params: any) {
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

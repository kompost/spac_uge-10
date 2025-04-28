import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private readonly hello: MessageService) { }

    @Get('test')
    getHello(): string {
        return this.hello.getHello();
    }

    @Get(':id')
    getById(@Param() params: any) {
        console.log(`id: ${params.id}`)
    }
}

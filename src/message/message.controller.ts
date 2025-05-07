import {
    Controller,
    Get,
    HttpException,
    Param,
    Body,
    Post,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';
import { CreateMessageDTO } from './message.dtos';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('message')
export class MessageController {
    constructor(private readonly service: MessageService) {}

    @Get(':id')
    @ApiBearerAuth('access-token')
    async getById(@Param() params: any): Promise<Message> {
        console.log('woot is going on');
        try {
            return this.service.getById(params.id);
        } catch (error) {
            throw new HttpException(
                `Message with ${params.id} does not exist\n${error.message}`,
                404,
            );
        }
    }

    @Get()
    @ApiBearerAuth('access-token')
    async getAll(): Promise<Message[]> {
        return await this.service.getAll();
    }

    @Post()
    @ApiBearerAuth('access-token')
    async newMessage(@Body() createMessageDTO: CreateMessageDTO) {
        this.service.addMessage(createMessageDTO);
    }
}

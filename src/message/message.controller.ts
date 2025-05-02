import { Controller, Get, Put, HttpCode, HttpException, Param, Body, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';
import { CreateMessageDTO } from './message.dtos';

@Controller('message')
export class MessageController {

    constructor(private readonly service: MessageService) { }


    @Get(':id')
    async getById(@Param() params: any): Promise<Message> {
        try {

            return this.service.getById(params.id)
        } catch (error) {
            throw new HttpException(`Message with ${params.id} does not exist\n${error.message}`, 404)
        }
    }

    @Get()
    async getAll(): Promise<Message[]> {
        return await this.service.getAll();
    }

    @Post()
    async newMessage(@Body() createMessageDTO: CreateMessageDTO) {
        this.service.addMessage(createMessageDTO)
    }
}

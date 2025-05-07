import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
} from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { Chatroom, Message, User } from '@prisma/client';
import {
    ChatroomFullDTO,
    ChatroomWithMessagesDTO,
    ChatroomWithUsersDTO,
} from './chatroom.dtos';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('chatroom')
export class ChatroomController {
    constructor(private readonly service: ChatroomService) {}

    @Get()
    @ApiBearerAuth('access-token')
    async getAllChatrooms(): Promise<Chatroom[]> {
        return this.service.getAll();
    }

    @Get(':id')
    @ApiBearerAuth('access-token')
    async getById(@Param('id') id: string): Promise<ChatroomFullDTO> {
        try {
            const chatroom: ChatroomFullDTO =
                await this.service.getChatroomFull(id);
            return chatroom;
        } catch (error) {
            throw new HttpException(
                `Chatroom with id: ${id} does not exsist\n${error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('getMessages/:id')
    @ApiBearerAuth('access-token')
    async getChatroomMessages(@Param('id') id: string): Promise<Message[]> {
        try {
            const chatroom: ChatroomWithMessagesDTO =
                await this.service.getChatroomMessages(id);
            return chatroom.messages;
        } catch (error) {
            throw new HttpException(
                `Chatroom with id: ${id} does not exsist\n${error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('getUsers/:id')
    @ApiBearerAuth('access-token')
    async getChatroomUsers(@Param('id') id: string): Promise<User[]> {
        try {
            const chatroom: ChatroomWithUsersDTO =
                await this.service.getChatroomUsers(id);
            return chatroom.users;
        } catch (error) {
            throw new HttpException(
                `Chatroom with id: ${id} does not exsist\n${error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}

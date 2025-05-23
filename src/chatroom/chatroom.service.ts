import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Chatroom } from '@prisma/client';
import {
    ChatroomWithMessagesDTO,
    ChatroomFullDTO,
    ChatroomWithUsersDTO,
} from './chatroom.dtos';

@Injectable()
export class ChatroomService {
    constructor(private readonly prisma: PrismaService) { }

    getAll(): Promise<Chatroom[]> {
        return this.prisma.chatroom.findMany();
    }

    async getById(id: string): Promise<Chatroom> {
        return await this.prisma.chatroom.findFirstOrThrow({
            where: { id },
        });
    }

    async getChatroomFull(id: string): Promise<ChatroomFullDTO> {
        return await this.prisma.chatroom.findFirstOrThrow({
            where: { id },
            include: { messages: true, users: true },
        });
    }

    async getChatroomMessages(id: string) {
        const messages = await this.prisma.chatroom.findFirstOrThrow({
            where: { id },
            include: {
                messages: true,
                users: true,
            },
        });

        return messages;
    }

    async getChatroomUsers(id: string) {
        return await this.prisma.chatroom.findFirstOrThrow({
            where: { id },
            include: {
                users: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });
    }
}

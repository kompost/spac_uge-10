import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chatroom } from '@prisma/client';

@Injectable()
export class ChatroomService {
    constructor(private readonly prisma: PrismaService) { }

    async getChatroom(id: string): Promise<any> {
        return await this.prisma.chatroom.findFirstOrThrow({
            where: { id },
            include: { messages: true }
        })
    }
}

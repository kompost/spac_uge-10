import { Injectable, NotImplementedException } from '@nestjs/common';
import { Message, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDTO } from './message.dtos';

@Injectable()
export class MessageService {
    constructor(private readonly prisma: PrismaService) { }

    async getById(id: string): Promise<Message> {
        return await this.prisma.message.findFirstOrThrow({
            where: {
                id,
            },
        });
    }
    async getAll(): Promise<Message[]> {
        return await this.prisma.message.findMany();
    }

    async addMessage(createMessageDTO: CreateMessageDTO) {
        const message = await this.prisma.message.create({
            data: {
                ...createMessageDTO,
            },
        });
        return message;
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class HelloWorldService {
    constructor(private readonly prisma: PrismaService) { }

    async getHello(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }

}

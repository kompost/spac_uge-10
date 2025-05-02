import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    getUser(name: string): Promise<User> {
        return this.prisma.user.findFirstOrThrow({ where: { username: name } });
    }
}

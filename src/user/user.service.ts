import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    getUser(name: string): Promise<User> {
        return this.prisma.user.findFirstOrThrow({ where: { username: name } });
    }

    getUserById(id: string): Promise<User> {
        return this.prisma.user.findFirstOrThrow({ where: { id } });
    }

    async validateUser(
        username: string,
        password: string,
    ): Promise<User | null> {
        try {
            const user = await this.getUser(username);
            if (user.password !== password) return null;
            return user;
        } catch (error) {
            return null;
        }
    }
}

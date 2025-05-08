import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async getUser(name: string): Promise<User> {
        const tmp = await this.prisma.user.findFirstOrThrow({
            where: { username: name },
        });
        return tmp
    }

    async getUserById(id: string): Promise<User> {
        return this.prisma.user.findFirstOrThrow({ where: { id } })
    }

    async createNewUser(username: string, password: string): Promise<User> {
        // this determans how many times the password is hased,
        // think it stands in for a power of 2 so a incress of this by 1 doubles the hasing amount

        const saltRounds = 10;
        const hasedPassword = await hash(password, saltRounds);

        const newUser = await this.prisma.user.create({
            data: {
                username,
                password: hasedPassword,
            },
        });

        return newUser;
    }
}


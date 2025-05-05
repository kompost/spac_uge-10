import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    getUser(name: string): Promise<User> {
        return this.prisma.user.findFirstOrThrow({ where: { username: name } });
    }

    getUserById(id: string): Promise<User> {
        return this.prisma.user.findFirstOrThrow({ where: { id } });
    }

    async createNewUser(username: string, password: string): Promise<User> {
        // this determans how many times the password is hased,
        // think it stands in for a power of 2 so a incress of this by 1 doubles the hasing amount

        const saltRounds = 10;
        const hasedPassword = await hash(password, saltRounds);
        console.log(hasedPassword);

        const newUser: User = await this.prisma.user.create({
            data: {
                username,
                password: hasedPassword,
            },
        });
        return newUser;
    }

    async validateUser(
        username: string,
        password: string,
    ): Promise<User | null> {
        try {
            const user = await this.getUser(username);
            const isValidLogin = await compare(password, user.password);
            if (!isValidLogin) return null;
            return user;
        } catch (error) {
            return null;
        }
    }
}

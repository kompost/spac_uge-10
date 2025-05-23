import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './login.dto';
import { User } from '@prisma/client';
import { SignUpDto } from './signup.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly users: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser({ username, password }: LoginDto) {
        const user = await this.users.getUser(username).catch((_) => null);
        if (!user) return null;

        const isValidLogin = await compare(password, user.password);
        if (!isValidLogin) return null;

        return user;
    }

    async login(user: Omit<User, 'password'>) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '2h',
            }),
        };
    }

    async register({ username, password }: SignUpDto) {
        const user = await this.users.getUser(username).catch((_) => null);

        if (user)
            throw new Error('username allready in use');

        const newUser = await this.users.createNewUser(
            username,
            password,
        );

        const { password: _, ...safeUser } = newUser;
        return safeUser;
    }

    async getUserById(id: string) {
        const user = await this.users.getUserById(id).catch((_) => null);
        if (!user) return null;

        const { password: _, ...safeUser } = user;
        return safeUser;
    }
}

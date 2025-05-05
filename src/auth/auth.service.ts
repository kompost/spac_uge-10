import { Inject, Injectable, Post, Res } from '@nestjs/common';
import {
    NotImplementedException,
    UnauthorizedException,
} from '@nestjs/common/exceptions';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './login.dto';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly users: UserService,
        @Inject('JWT_TOKEN') private readonly jwtSecret: string,
    ) {}

    async login({ username, password }: LoginDto) {
        const user = await this.users.validateUser(username, password);
        if (!user) {
            return null;
        } // throw new UnauthorizedException(); // TODO: this crashes the server

        return jwt.sign(
            { sub: user.id, username: user.username },
            this.jwtSecret,
            {
                expiresIn: '2h',
                issuer: 'spac-10-chattelicious',
            },
        );
    }

    async register({ username, password }: LoginDto): Promise<LoginDto> {
        if ((await this.users.validateUser(username, password)) != null)
            throw 'username allready in use';

        const newUser: User = await this.users.createNewUser(
            username,
            password,
        );

        return { username: newUser.username, password: newUser.password };
    }
}

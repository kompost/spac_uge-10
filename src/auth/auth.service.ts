import { Inject, Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./login.dto";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
    constructor(
        private readonly users: UserService,
        @Inject('JWT_TOKEN') private readonly jwtSecret: string,
    ) { }

    async login({ username, password }: LoginDto) {
        const user = await this.users.validateUser(username, password);
        if (!user) throw new UnauthorizedException();

        const token = jwt.sign({ sub: user.id, username: user.username }, this.jwtSecret, {
            expiresIn: '2h',
            issuer: 'spac-10-chattelicious',
        });

        return { accessToken: token };
    }
}

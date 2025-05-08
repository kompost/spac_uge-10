import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTokenService {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
        @Inject('JWT_SECRET') private jwtSecret: string,
    ) { }

    async validateToken(token: string) {
        const payload = this.jwtService.verify(token, {
            secret: this.jwtSecret,
        });

        const user = await this.authService.getUserById(payload.sub);
        if (!user) throw new Error('Invalid user');

        return { userId: user.id, username: user.username, role: user.role };
    }
}

import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        readonly authService: AuthService,
        @Inject('JWT_SECRET') jwtSecret: string,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: { sub: string }) {
        const user = await this.authService.getUserById(payload.sub);
        if (!user) {
            throw new Error('User not found');
        }
        return { userId: user.id, username: user.username, role: user.role };
    }
}

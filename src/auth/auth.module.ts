import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt.guard';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                const secreto = configService.get<string>('JWT_SECRET');
                console.log('this is the secret', secreto);
                return {
                    secret: secreto,
                    signOptions: { expiresIn: '2h' },
                }
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtService,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: 'JWT_SECRET',
            useFactory: (configService: ConfigService) =>
                configService.get<string>('JWT_SECRET'),
            inject: [ConfigService],
        },
    ],
    exports: [AuthService, JwtStrategy, JwtService],
})
export class AuthModule { }

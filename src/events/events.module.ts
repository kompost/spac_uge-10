import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatGateway } from './events.gateway';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [PrismaModule, UserModule, ConfigModule],
    providers: [
        ChatGateway,
        {
            provide: 'JWT_TOKEN',
            useFactory: (configService: ConfigService) =>
                configService.get<string>('JWT_SECRET'),
            inject: [ConfigService],
        },
    ],
    controllers: [],
})
export class EventModule {}

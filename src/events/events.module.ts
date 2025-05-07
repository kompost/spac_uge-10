import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatGateway } from './events.gateway';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { MessageModule } from 'src/message/message.module';
import { ChatroomModule } from 'src/chatroom/chatroom.module';

@Module({
    imports: [
        PrismaModule,
        UserModule,
        AuthModule,
        MessageModule,
        ChatroomModule,
    ],
    providers: [
        ChatGateway,
    ],
    controllers: [],
})
export class EventModule { }

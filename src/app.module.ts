import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './message/message.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { ChatroomModule } from './chatroom/chatroom.module';
import { EventModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        HelloWorldModule,
        EventModule,
        PrismaModule,
        MessageModule,
        ChatroomModule,
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'public'),
        }),
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }

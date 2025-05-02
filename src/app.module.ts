import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatGateway } from './events/events.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
    imports: [
        HelloWorldModule,
        PrismaModule,
        UserModule,
        ChatroomModule,
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'public'),
        }),
    ],
    controllers: [],
    providers: [ChatGateway],
})
export class AppModule { }

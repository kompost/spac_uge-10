import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
    imports: [HelloWorldModule, PrismaModule, UserModule, ChatroomModule],
    controllers: [],
    providers: [],
})
export class AppModule { }

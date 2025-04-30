import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './message/message.module';

@Module({
    imports: [HelloWorldModule, PrismaModule, MessageModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

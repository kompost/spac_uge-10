import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { MessageModule } from './message/message.module';

@Module({
    imports: [HelloWorldModule, MessageModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

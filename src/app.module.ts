import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [HelloWorldModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

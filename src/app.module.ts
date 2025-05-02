import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [HelloWorldModule, PrismaModule, UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

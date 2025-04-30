import { Module } from '@nestjs/common';
import { HelloWorldService } from './hello-world.service';
import { HelloWorldController } from './hello-world.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [HelloWorldService],
    controllers: [HelloWorldController],
})
export class HelloWorldModule { }

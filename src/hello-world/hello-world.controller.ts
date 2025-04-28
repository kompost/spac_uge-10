import { Controller, Get, Param } from '@nestjs/common';
import { HelloWorldService } from './hello-world.service';

@Controller('hello-world')
export class HelloWorldController {
    constructor(private readonly hello: HelloWorldService) {}

    @Get('test')
    getHello(): string {
        return this.hello.getHello();
    }
    
    @Get(':id')
    getById(@Param() params:any) {
        console.log(`id: ${params.id}`) 
    }
}

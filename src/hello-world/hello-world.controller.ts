import { Controller, Get, Param } from '@nestjs/common';
import { HelloWorldService } from './hello-world.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('hello-world')
export class HelloWorldController {
    constructor(private readonly hello: HelloWorldService) { }

    @Get(':name')
    @ApiParam({
        name: 'name',
        type: String,
        description: 'Your name',
        example: 'John Doe',
    })
    @ApiOperation({ summary: 'gets you a hellow world with your name' })
    @ApiResponse({
        status: 200,
        description: 'all gucci',
    })
    getHello(
        @Param('name') name: string,
    ): string {
        return this.hello.getHello() + name;
    }
    
    @Get(':id')
    getById(@Param() params:any) {
        console.log(`id: ${params.id}`) 
    }
}

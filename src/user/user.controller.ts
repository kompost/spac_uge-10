import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get(':name')
    @ApiBearerAuth('access-token')
    async getUser(@Param('name') name: string): Promise<User> {
        try {
            return await this.service.getUser(name);
        } catch (error) {
            throw new HttpException(
                `User with the name: ${name} does not exsist\n${error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}

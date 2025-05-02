import { ApiProperty } from '@nestjs/swagger';
import {IsString} from 'class-validator'

export class CreateMessageDTO {
    @ApiProperty()
    @IsString()
    userId: string;
    @ApiProperty()
    @IsString()
    chatroomId: string;
    @ApiProperty()
    @IsString()
    message: string;
}

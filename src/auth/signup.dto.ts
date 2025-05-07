import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUpDto {
    @IsString()
    @ApiProperty({ description: 'Username of the user' })
    username: string;

    @IsString()
    @ApiProperty({ description: 'Password of the user' })
    password: string;
}

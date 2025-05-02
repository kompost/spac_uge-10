import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDTO {
    @ApiProperty()
    userId: string;
    @ApiProperty()
    chatroomId: string;
    @ApiProperty()
    message: string;
}

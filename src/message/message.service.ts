import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class MessageService {
    getHello(): string {
        return 'Hello World!';
    }
    getChatroomMessages(chatroomId: string): object[] {
        throw new NotImplementedException()
    }
}

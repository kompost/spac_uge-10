import { Injectable, NotImplementedException } from '@nestjs/common';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
    getById(id: any) :Message{
        throw new Error('Method not implemented.');
    }
    getAll() : [] {
        throw new Error('Method not implemented.');
    }

}

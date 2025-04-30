import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class MessageService {
    getById(id: any) {
        throw new Error('Method not implemented.');
    }
    getAll() : [] {
        throw new Error('Method not implemented.');
    }

}

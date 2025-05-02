import { Message, User } from '@prisma/client';
import { IsString } from 'class-validator';

export class ChatroomWithMessagesDTO {
    @IsString()
    id: string;
    @IsString()
    name: string;
    
    messages: Message[];
}
export class ChatroomWithUsersDTO {
    @IsString()
    id: string;
    @IsString()
    name: string;
    users: User[];
}
export class ChatroomFullDTO {
    @IsString()
    id: string;
    @IsString()
    name: string;
    users: User[];
    messages: Message[];
}

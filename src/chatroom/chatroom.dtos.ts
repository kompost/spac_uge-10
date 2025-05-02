import { Message, User } from "@prisma/client";

export class ChatroomWithMessagesDTO  {
    id:string;
    name:string;
    messages:Message[];
}
export class ChatroomWithUsersDTO  {
    id:string;
    name:string;
    users:User[];
}
export class ChatroomFullDTO  {
    id:string;
    name:string;
    users:User[];
    messages:Message[];
}
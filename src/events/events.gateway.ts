import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { MessageService } from 'src/message/message.service';
import { AuthTokenService } from 'src/auth/auth-token.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    private users: Map<string, { userId: string; username: string }> = new Map();

    constructor(
        private readonly authService: AuthTokenService,
        private readonly chatroomService: ChatroomService,
        private readonly messageService: MessageService,
    ) { }


    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth?.token;
            if (!token) throw new Error('No token provided');

            const user = await this.authService.validateToken(token);
            if (!user) throw new Error('User not found');

            this.users.set(client.id, { userId: user.userId, username: user.username });

            console.log(`User ${user.username} connected`);
        } catch (err) {
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        const user = this.users.get(client.id);
        if (user) {
            console.log(`User ${user.username} disconnected`);
            this.users.delete(client.id);
        } else {
            console.log(`Unknown client disconnected: ${client.id}`);
        }
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        @MessageBody() roomId: string,
        @ConnectedSocket() client: Socket,
    ) {
        const room = await this.chatroomService.getById(roomId).catch(_ => null);
        if (!room) {
            client.emit('error', 'Room not found');
            return;
        }

        client.join(roomId);
        client.emit('joinedRoom', room);
    }

    @SubscribeMessage('leaveRoom')
    async handleLeaveRoom(
        @MessageBody() roomId: string,
        @ConnectedSocket() client: Socket,
    ) {
        const room = await this.chatroomService.getById(roomId).catch(_ => null);
        if (!room) {
            client.emit('error', 'Room not found');
            return;
        }

        client.leave(roomId);
        client.emit('leftRoom', room);
    }

    @SubscribeMessage('chatToServer')
    async handleMessage(
        @MessageBody() payload: { roomId: string; message: string },
        @ConnectedSocket() client: Socket,
    ) {
        const clientInfo = this.users.get(client.id);
        if (!clientInfo) {
            client.emit('error', 'User not found');
            return;
        }

        await this.messageService.addMessage({
            chatroomId: payload.roomId,
            userId: clientInfo.userId,
            message: payload.message,
        });


        client.to(payload.roomId).emit('chatToClient', {
            sender: clientInfo.username,
            message: payload.message,
        });
    }
}

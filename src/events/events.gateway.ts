import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { MessageService } from 'src/message/message.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    private users: Map<string, { userId: string; username: string }> =
        new Map();

    constructor(
        private readonly user: UserService,
        private readonly jwtStrategy: JwtStrategy,
        private readonly chatroomService: ChatroomService,
        private readonly messageService: MessageService,
        private readonly jwtService: JwtService,
    ) { }


    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth?.token;
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            })
            const user = await this.user.getUserById(payload.sub);

            if (!user) throw new Error('User not found');

            this.users.set(client.id, { userId: user.id, username: user.username });

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
        client.emit('leftRoom', roomId);
    }

    @SubscribeMessage('chatToServer')
    async handleMessage(
        @MessageBody() payload: { roomId: string; message: string },
        @ConnectedSocket() client: Socket,
    ) {
        const userId = this.users.get(client.id)?.userId;
        const username = this.users.get(client.id)?.username;
        if (!username || !userId) {
            client.emit('error', 'User not found');
            return;
        }

        await this.messageService.addMessage({
            chatroomId: payload.roomId,
            userId,
            message: payload.message,
        });

        client.to(payload.roomId).emit('chatToClient', {
            sender: username,
            message: payload.message,
        });
    }
}

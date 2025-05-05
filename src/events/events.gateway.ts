import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { Inject } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    private users: Map<string, { userId: string; username: string }> =
        new Map();

    constructor(
        private readonly user: UserService,
        @Inject('JWT_TOKEN') private readonly jwtToken: string,
    ) {}

    async handleConnection(client: Socket) {
        try {
            // const token = client.handshake.auth?.token;
            //
            // const payload = await this.verifyToken(token);
            //
            // const user = await this.user.getUserById(payload.sub);
            //
            // if (!user) throw new Error('User not found');

            // this.users.set(client.id, { userId: user.id, username: user.username });

            this.users.set(client.id, { userId: 'halli', username: 'halloj' });

            // console.log(`User ${user.username} connected`);
        } catch (err) {
            console.error('Auth failed:', err.message);
            client.disconnect();
        }
    }

    private async verifyToken(token: string): Promise<{ sub: string }> {
        // Example using jsonwebtoken directly
        return jwt.verify(token, this.jwtToken) as { sub: string };
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
    handleJoinRoom(
        @MessageBody() room: string,
        @ConnectedSocket() client: Socket,
    ) {
        client.join(room);
        client.emit('joinedRoom', room);
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(
        @MessageBody() room: string,
        @ConnectedSocket() client: Socket,
    ) {
        client.leave(room);
        client.emit('leftRoom', room);
    }

    @SubscribeMessage('chatToServer')
    handleMessage(
        @MessageBody() payload: { room: string; message: string },
        @ConnectedSocket() client: Socket,
    ) {
        client.to(payload.room).emit('chatToClient', {
            sender: client.id,
            message: payload.message,
        });
    }
}

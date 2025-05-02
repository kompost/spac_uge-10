import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    constructor() // private readonly server: Server, // Inject the server instance
    {}

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
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

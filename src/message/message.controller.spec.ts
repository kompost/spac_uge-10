import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';
import { HttpException, Logger } from '@nestjs/common';
import { CreateMessageDTO } from './message.dtos';

describe('MessageController', () => {
    let controller: MessageController;

    let mockMessages: Message[] = [
        {
            id: 'test0',
            userId: 'uid0',
            chatroomId: 'cid0',
            createdAt: new Date(2000, 1, 1),
            message: 'hello 0',
        },
        {
            id: 'test1',
            userId: 'uid1',
            chatroomId: 'cid1',
            createdAt: new Date(2000, 1, 1),
            message: 'hello 1',
        },
        {
            id: 'test2',
            userId: 'uid2',
            chatroomId: 'cid2',
            createdAt: new Date(2000, 1, 1),
            message: 'hello 2',
        },
        {
            id: 'test3',
            userId: 'uid3',
            chatroomId: 'cid3',
            createdAt: new Date(2000, 1, 1),
            message: 'hello 3',
        },
    ]
    const mockMessageServise = {
        getAll: (): Message[] => mockMessages,
        getById: (id: string) => {
            const message = mockMessages.find(message => message.id == id)
            if (!message) throw new Error()
            return message
        },
        addMessage: (createMessageDTO: CreateMessageDTO) => {
            mockMessages.push({ ...createMessageDTO, id: 'test4', createdAt: new Date() })
        }

    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MessageController],
            providers: [MessageService]
        })
            .overrideProvider(MessageService)
            .useValue(mockMessageServise)
            .compile();

        controller = module.get<MessageController>(MessageController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('shuld get all', async () => {
        const all = await controller.getAll();
        expect(all).toHaveLength(mockMessages.length);
    });

    describe('getById', () => {
        it('shuld get a messsage', async () => {
            const expected = mockMessages[0]
            const actual = await controller.getById('test0')
            expect(actual).toEqual(expected)
        })
        it('shuld throw if id is invalid', async () => {
            expect(controller.getById('-1')).rejects.toThrow(HttpException)
        })
    })
    it('shuld create a new message', async () => {
        const newMessage:CreateMessageDTO = {userId: 'uid0',chatroomId:'cid0', message:'test4'}

        await controller.newMessage(newMessage)
        
        const createdMessage:Message = await controller.getById('test4')
        expect(createdMessage.id).toBe('test4')
    })
});

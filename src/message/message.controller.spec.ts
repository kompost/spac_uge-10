import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';
import { Logger } from '@nestjs/common';


describe('MessageController', () => {
    let controller: MessageController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MessageController],

        }).setLogger(Logger).useMocker((token) => {
            const testingMssages: Message[] = [
                { id: 'test1', userId: "uid1", chatroomId: "cid1", createdAt: new Date(2000, 1, 1), message: 'hello 1' },
                { id: 'test2', userId: "uid2", chatroomId: "cid2", createdAt: new Date(2000, 1, 1), message: 'hello 2' },
                { id: 'test3', userId: "uid3", chatroomId: "cid3", createdAt: new Date(2000, 1, 1), message: 'hello 3' },
            ]

            if (token === MessageService) {
                return {
                    getAll: jest.fn().mockReturnValue(testingMssages),
                }
            }
        }).compile();

        controller = module.get<MessageController>(MessageController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('shuld get all', () => {
        const all = controller.getAll()
        expect(all).toHaveLength(3)
    })
});

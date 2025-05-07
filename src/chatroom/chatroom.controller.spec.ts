import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { Chatroom, Role, User } from '@prisma/client';
import { ChatroomFullDTO, ChatroomWithMessagesDTO, ChatroomWithUsersDTO } from './chatroom.dtos';
import { HttpException } from '@nestjs/common';
import { describe } from 'node:test';

describe('ChatroomController', () => {
    let controller: ChatroomController;

    let mockUsers: User[] = [
        { id: '0', username: 'user 0', password: '', role: Role.USER },
        { id: '1', username: 'user 1', password: '', role: Role.USER },
        { id: '2', username: 'user 2', password: '', role: Role.USER },
        { id: '3', username: 'user 3', password: '', role: Role.USER },
        { id: '4', username: 'user 4', password: '', role: Role.USER },
        { id: '5', username: 'user 5', password: '', role: Role.USER },
    ]
    let mockChatrooms = [
        {
            name: "name0", id: "0", users: [mockUsers[0], mockUsers[1]], messages: [
                { id: '0', message: 'message 1', userId: '0', chatroomId: '0', createdAt: new Date() },
                { id: '1', message: 'message 2', userId: '1', chatroomId: '0', createdAt: new Date() },
                { id: '2', message: 'message 3', userId: '0', chatroomId: '0', createdAt: new Date() },
            ]
        },
        {
            name: "name1", id: "1", users: [mockUsers[2], mockUsers[1], mockUsers[3]], messages: [
                { id: '3', message: 'message 1', userId: '2', chatroomId: '1', createdAt: new Date() },
                { id: '4', message: 'message 2', userId: '1', chatroomId: '1', createdAt: new Date() },
                { id: '5', message: 'message 3', userId: '2', chatroomId: '1', createdAt: new Date() },
            ]
        },
        {
            name: "name2", id: "2", users: [mockUsers[4], mockUsers[5]], messages: [
                { id: '6', message: 'message 1', userId: '5', chatroomId: '2', createdAt: new Date() },
                { id: '7', message: 'message 2', userId: '4', chatroomId: '2', createdAt: new Date() },
                { id: '8', message: 'message 3', userId: '4', chatroomId: '2', createdAt: new Date() },
            ]
        },
        {
            name: "no users and messages", id: "3", users: [], messages: []
        },

    ]
    let mockChatroomServise = {
        getAll: (): Chatroom[] => mockChatrooms,
        getChatroomFull: (id: string): ChatroomFullDTO => {
            const room = mockChatrooms.find(chatroom => chatroom.id == id)
            if (!room) throw new Error()
            return room
        },
        getChatroomMessages: (id: string): ChatroomWithMessagesDTO => {
            const messages = mockChatrooms.find(chatroom => chatroom.id == id)
            if (!messages) throw new Error()
            return messages
        },
        getChatroomUsers: (id: string): ChatroomWithUsersDTO => {
            const users = mockChatrooms.find(chatroom => chatroom.id == id)
            if (!users) throw new Error()
            return users
        },
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChatroomController],
            providers: [ChatroomService]
        })
            .overrideProvider(ChatroomService)
            .useValue(mockChatroomServise)
            .compile();

        controller = module.get<ChatroomController>(ChatroomController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('shuld get list form getAll', async () => {

        const actual = await controller.getAllChatrooms()
        expect(actual).toHaveLength(mockChatrooms.length)
    })

    describe('getById', () => {
        it('shuld get a full chatroom form any id', async () => {
            let actual = await controller.getById('0')
            let expected = mockChatrooms[0]
            expect(actual).toEqual(expected)

            actual = await controller.getById('1')
            expected = mockChatrooms[1]
            expect(actual).toEqual(expected)
        })

        it('shuld throw in getById if id dos not exist', () => {
            expect(controller.getById('-1')).rejects.toThrow(HttpException)
        })
    })
    describe('getChatroomMessages', () => {

        it('shuld get list of meesages from id', async () => {
            const actual = await controller.getChatroomMessages('0')
            const expected = mockChatrooms[0].messages
            expect(actual).toEqual(expected)
        })

        it('shuld get list of meesages from id even if empty', async () => {
            const actual = await controller.getChatroomMessages('3')
            const expected = mockChatrooms[3].messages
            expect(actual).toEqual(expected)
        })

        it('shuld throw in getChatroomMessages if id dos not exist', () => {
            expect(controller.getChatroomMessages('-1')).rejects.toThrow(HttpException)
        })
    })
    describe('getChatroomUsers', () => {
        it('shuld return with a list of users', async () => {
            const actual = await controller.getChatroomUsers('1')
            const expected = mockChatrooms[1].users
            expect(actual).toEqual(expected)
        })
        it('shuld return with a list of users even if there are no users', async () => {
            const actual = await controller.getChatroomUsers('3')
            const expected = mockChatrooms[3].users
            expect(actual).toEqual(expected)
        })

        it('shuld throw in getChatroomUsers if id dos not exist', () => {
            expect(controller.getChatroomUsers('-1')).rejects.toThrow(HttpException)
        })
    })
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role, User } from '@prisma/client';
import { HttpException } from '@nestjs/common';

describe('UserController', () => {
    let controller: UserController;
    const mockUsers: User[] = [
        { id: '0', username: 'user 0', password: '', role: Role.USER },
        { id: '1', username: 'user 1', password: '', role: Role.USER },
        { id: '2', username: 'user 2', password: '', role: Role.USER },
        { id: '3', username: 'user 3', password: '', role: Role.USER },
        { id: '4', username: 'user 4', password: '', role: Role.USER },
        { id: '5', username: 'user 5', password: '', role: Role.USER },
    ]
    const mockUserService = {
        getUser: (name: string) => {
            const user = mockUsers.find(user => user.username == name)
            if (!user) throw new Error()
            return user
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService]
        })
            .overrideProvider(UserService)
            .useValue(mockUserService)
            .compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('shuld get a user', async () => {
        const expected = mockUsers[0]
        const actual = await controller.getUser('user 0')
        expect(actual).toBe(expected)
    })
    it('shuld throw in if user dos not exist', () => {
        expect(controller.getUser('-1')).rejects.toThrow(HttpException)
    })
});

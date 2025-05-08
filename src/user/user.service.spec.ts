import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaModule } from '../prisma/prisma.module';
import { error } from 'console';


describe('UserService', () => {
    let service: UserService;
    let mockUsers: User[]

    let mockPrismaService = {
        user: {
            findFirstOrThrow: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn()
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            providers: [UserService],

        })
            .overrideProvider(PrismaService)
            .useValue(mockPrismaService)
            .compile();
        mockPrismaService.user.findFirstOrThrow.mockClear()
        mockUsers = [
            { id: '0', username: 'user 0', password: '', role: Role.USER },
            { id: '1', username: 'user 1', password: '', role: Role.USER },
        ]
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getUser', () => {

        it('should get a user by name', async () => {

            const expected = mockUsers[0]
            mockPrismaService.user.findFirstOrThrow.mockReturnValue(expected)

            const actual = await service.getUser('user 0')
            expect(mockPrismaService.user.findFirstOrThrow).toHaveBeenCalledWith({ "where": { "username": "user 0" } })
            expect(actual).toBe(expected)
        })

        it('shuld thorw an error when name does not exsist', () => {
            mockPrismaService.user.findFirstOrThrow.mockRejectedValue(new Error())
            expect(service.getUser('')).rejects.toThrow(Error)
        })
    })
    describe('getUserById', () => {

        it('should get a user by id', async () => {

            const expected = mockUsers[0]
            mockPrismaService.user.findFirstOrThrow.mockReturnValue(expected)

            const actual = await service.getUserById('0')
            expect(mockPrismaService.user.findFirstOrThrow).toHaveBeenCalledWith({ "where": { "id": "0" } })
            expect(actual).toBe(expected)
        })
        it('shuld thorw an error when id does not exsist', () => {
            mockPrismaService.user.findFirstOrThrow.mockRejectedValue(new Error())
            expect(service.getUserById('')).rejects.toThrow(Error)
        })
    })
    describe('createNewUser', () => {
        it('shuld be saved in list', async () => {

            mockPrismaService.user.create.mockImplementation(data => {
                const newUser: User = { ...data, id: '10', role: 'USER' }
                mockUsers.push(newUser)
                return newUser
            })

            const created = await service.createNewUser('username', 'password')
            const inArray = mockUsers[2]
            expect(mockUsers).toHaveLength(3)
            expect(created).toBe(inArray)
        })
        it('shuld have hased password', async () => {
            mockPrismaService.user.create.mockImplementation(data => {
                const newUser: User = { ...data, id: '10', role: 'USER' }
                mockUsers.push(newUser)
                return newUser
            })

            const created = await service.createNewUser('username', 'password')
            
            expect(created.password).not.toEqual('password')
        })
    })
});

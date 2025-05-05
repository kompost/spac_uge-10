import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany()
    await prisma.chatroom.deleteMany()
    await prisma.message.deleteMany()
    const saltRounds = 10
    const john = await prisma.user.create({
        data: {
            username: 'john',
            password: await hash('Admin', saltRounds),
            role: Role.ADMIN
        },
    });
    const doe = await prisma.user.create({
        data: {
            username: 'doe',
            password: await hash('test', saltRounds),
        },
    });

    await prisma.user.create({
        data: {
            username: 'Alice',
            password: await hash('test2', saltRounds),
        },
    });

    const chat = await prisma.chatroom.create({
        data: {
            name: "test",
            users: { connect: [john, doe] }
        }

    })
    await prisma.message.create({
        data: {
            User: { connect: john },
            Chatroom: { connect: chat },
            message: "test message 1"
        }
    })
    await prisma.message.create({
        data: {
            User: { connect: doe },
            Chatroom: { connect: chat },
            message: "test message 2"
        }
    })
    await prisma.message.create({
        data: {
            User: { connect: doe },
            Chatroom: { connect: chat },
            message: "test message 3"
        }
    })
    await prisma.message.create({
        data: {
            User: { connect: john },
            Chatroom: { connect: chat },
            message: "test message 4"
        }
    })
    

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Seeding completed');
        await prisma.$disconnect();
    });

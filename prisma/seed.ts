import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany()
    await prisma.chatroom.deleteMany()
    await prisma.message.deleteMany()
    const john = await prisma.user.create({
        data: {
            username: 'john',
            password: 'Admin',
        },
    });
    const doe = await prisma.user.create({
        data: {
            username: 'doe',
            password: 'test',
        },
    });
    await prisma.user.create({
        data: {
            username: 'Alice',
            password: 'test',
        },
    });
    
    
    const chat = await prisma.chatroom.create({
        data:{
            name: "test", 
            users: {connect:[john, doe]}
        }
        
    })
    const msg1 = await prisma.message.create({
        data: {
            User: {connect:john},
            Chatroom: {connect:chat},
            message: "test message 1"
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

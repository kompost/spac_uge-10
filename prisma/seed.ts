import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany()
    await prisma.chatroom.deleteMany()
    await prisma.message.deleteMany()

    await prisma.chatroom.create({
        data: {
            name: "general",
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

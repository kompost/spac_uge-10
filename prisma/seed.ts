import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            username: 'john',
            password: 'Admin',
        },
    });
    await prisma.user.create({
        data: {
            username: 'doe',
            password: 'test',
        },
    });

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

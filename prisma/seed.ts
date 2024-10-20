import {PrismaClient} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashPassword = await bcrypt.hash('password', 10);

    await prisma.user.create({
        data: {
            email: 'test_email@example.com',
            password: hashPassword,
            name: 'Test User',
        },
    });

    console.log('User created successfully');

    await prisma.invoice.create({
      data: {
        // use the following fields sample to create a new invoice
        // vendor_name: string; amount: number; due_date: Date; description: string; paid: boolean; userId: number;
        id: 1,
        vendor_name: 'Vendor1',
        amount: 100,
        due_date: '2024-11-01T00:00:00.000Z',
        description: 'Invoice for project',
        paid: true,
        user_id: 1,
      },
    });
    
}

main()
    .catch((e)=> {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
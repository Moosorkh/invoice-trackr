import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create a hashed password for the user
  const hashPassword = await bcrypt.hash('password', 10);

  // Create a user
  await prisma.user.create({
    data: {
      email: 'test_email@example.com',
      password: hashPassword,
      name: 'Test User',
    },
  });
  console.log('User created successfully');

  // Create several invoices
  await prisma.invoice.createMany({
    data: [
      {
        vendor_name: 'Vendor1',
        amount: 100,
        due_date: '2024-11-01T00:00:00.000Z',
        description: 'Invoice for project',
        paid: true,
        user_id: 1,
      },
      {
        vendor_name: 'Vendor2',
        amount: 200,
        due_date: '2024-11-15T00:00:00.000Z',
        description: 'Invoice for service',
        paid: false,
        user_id: 1,
      },
      {
        vendor_name: 'Vendor3',
        amount: 300,
        due_date: '2024-11-20T00:00:00.000Z',
        description: 'Invoice for maintenance',
        paid: false,
        user_id: 1,
      },
    ],
  });

  console.log('Invoices created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

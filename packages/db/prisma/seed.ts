import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'securepassword',
      number: 1234567890,
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: 'Success',
          amount: 20000,
          token: 'TXN122',
          provider: 'HDFC Bank',
        },
      },
      Balance: {
        create: {
          amount: 50000,
          locked: 5000,
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'securepassword',
      number: 1234567590,
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: 'Failure',
          amount: 2000,
          token: 'TXN123',
          provider: 'HDFC Bank',
        },
      },
      Balance: {
        create: {
          amount: 15000,
          locked: 1000,
        },
      },
    },
  });

  // Create Merchants
  const merchant1 = await prisma.merchant.upsert({
    where: { email: 'merchant1@example.com' },
    update: {},
    create: {
      name: 'Merchant One',
      email: 'merchant1@example.com',
      auth_type: 'Google',
    },
  });

  const merchant2 = await prisma.merchant.upsert({
    where: { email: 'merchant2@example.com' },
    update: {},
    create: {
      name: 'Merchant Two',
      email: 'merchant2@example.com',
      auth_type: 'Github',
    },
  });

  console.log({ alice, bob, merchant1, merchant2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

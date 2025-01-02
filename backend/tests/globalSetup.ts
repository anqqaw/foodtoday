import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async () => {
  await prisma.user.deleteMany();
  await prisma.dinner.deleteMany();
};

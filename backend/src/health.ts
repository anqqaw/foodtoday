import { prisma } from './prisma';

export const check = async (ctx: any) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    ctx.status = 200;
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = {
      error: error.message,
    };
  }
};

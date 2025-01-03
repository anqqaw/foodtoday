import { prisma } from './prisma';

const dinnerSelect = {
  title: true,
  description: true,
  difficulty: true,
  preparationTime: true,
  totalTime: true,
  images: true,
};

export const list = async (ctx: any) => {
  try {
    const dinners = await prisma.dinner.findMany({ select: dinnerSelect });

    ctx.body = { dinners };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while fetching dinners.' };
  }
};

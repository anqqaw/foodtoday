import Redis from 'ioredis';

import { prisma } from './prisma';
import { config } from './config';

const redis = new Redis(config.REDIS_URL, { family: 6 });

export const check = async (ctx: any) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    // Check Redis Connection
    const redisStatus = await redis.ping();
    if (redisStatus !== 'PONG') {
      throw new Error('Redis is not responding');
    }

    ctx.status = 200;
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = {
      error: error.message,
    };
  }
};

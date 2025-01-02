import Redis from 'ioredis';
import { Context, Next } from 'koa';

import { config } from '../config';

const redis = new Redis(config.REDIS_URL, { family: 6 });

const RATE_LIMIT = 5; // Max actions per user per minute
const WINDOW_SIZE = 60; // Time window in seconds

export async function rateLimitMiddleware(ctx: Context, next: Next) {
    const userId = ctx.state.user?.id;

    if (!userId) {
        ctx.status = 401;
        ctx.body = { error: 'User not authenticated' };
        return;
    }

    const redisKey = `rate_limit:${userId}`;
    const currentTime = Math.floor(Date.now() / 1000);

    // Fetch user action count and first action timestamp
    const [actionCountRaw, firstActionTimeRaw] = await redis.mget(redisKey, `${redisKey}:start`);
    const actionCount = parseInt(actionCountRaw || '0', 10);
    const firstActionTime = parseInt(firstActionTimeRaw || '0', 10);

    if (!firstActionTime || currentTime - firstActionTime > WINDOW_SIZE) {
        // Reset window
        await redis.set(redisKey, '1', 'EX', WINDOW_SIZE);
        await redis.set(`${redisKey}:start`, currentTime.toString(), 'EX', WINDOW_SIZE);
    } else if (actionCount >= RATE_LIMIT) {
        // Rate limit exceeded
        ctx.status = 429; // Too Many Requests
        ctx.body = { error: 'Rate limit exceeded. Please try again later.' };
        return;
    } else {
        // Increment action count
        await redis.set(redisKey, (actionCount + 1).toString(), 'EX', WINDOW_SIZE);
    }

    await next();
}

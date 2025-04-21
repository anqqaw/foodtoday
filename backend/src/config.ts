import { config as loadEnv } from 'dotenv';
import { join } from 'path';

const envFile = process.env.NODE_ENV === 'test'
  ? join(process.cwd(), '.env.test')
  : join(process.cwd(), '.env');

loadEnv({ path: envFile });

export const config: any = {
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://chrome:chrome@localhost/chrome',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
};

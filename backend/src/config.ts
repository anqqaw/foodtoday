export const config: any = {
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://chrome:chrome@localhost/chrome',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
};

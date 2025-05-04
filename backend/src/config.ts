export const config: any = {
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://dinner:dinner@localhost/dinner',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
};

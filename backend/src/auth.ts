import Router from 'koa-router';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Context } from 'koa';
import { prisma } from './prisma';

const router = new Router();

router.post('/register', async (ctx: Context) => {
  const { email, password } = ctx.request.body as { email: string; password: string };

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Email and password are required' };
    return;
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    ctx.status = 409;
    ctx.body = { error: 'User already exists' };
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    ctx.throw(500, 'JWT_SECRET missing');
  }

  const token = jwt.sign({ userId: newUser.id, email: newUser.email }, jwtSecret, {
    expiresIn: '1d',
  });

  ctx.body = { token };
});

router.post('/login', async (ctx: Context) => {
  const { email, password } = ctx.request.body as { email: string; password: string };

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Email and password required' };
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid email or password' };
    return;
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid email or password' };
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    ctx.throw(500, 'JWT_SECRET missing');
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
    expiresIn: '1d',
  });

  ctx.body = { token };
});

export default router;

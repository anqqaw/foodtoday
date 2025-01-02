import axios from 'axios';
import { Context, Next } from 'koa';

import { prisma } from '../prisma';

export async function verifyGoogleToken(ctx: Context, next: Next) {
  const authHeader = ctx.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = { message: 'Authorization header missing or malformed' };
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { email, name } = response.data;
    if (!email) {
      throw new Error('Email not found in user profile');
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }

    ctx.state.user = user;
    await next();
  } catch (error) {
    console.error('Token verification failed:', error);
    ctx.status = 401;
    ctx.body = { message: 'Unauthorized' };
  }
}

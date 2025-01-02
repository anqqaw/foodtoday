import axios from 'axios';
import { Context, Next } from 'koa';
import { OAuth2Client } from 'google-auth-library';

import { prisma } from '../prisma';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(ctx: Context, next: Next) {
  const authHeader = ctx.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = { message: 'Authorization header missing or malformed' };
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new Error('Email not found in user profile');
    }

    const { email } = payload;

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

import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../prisma';

export async function verifyToken(ctx: any, next: any) {
  const authHeader = ctx.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Token missing' };
    return;
  }

  try {
    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
      const userId = payload.userId || payload.id;
      if (!userId) throw new Error('Invalid token payload');

      const existingUser = await prisma.user.findUnique({ where: { id: userId } });
      if (!existingUser) {
        ctx.status = 401;
        ctx.body = { error: 'Invalid token' };
        return;
      }

      ctx.state.user = existingUser;
      await next();
      return;
    } catch (err) {
      // not jwt --> try google token
    }

    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    if (!googleClientId) {
      throw new Error('Google client id not configured');
    }

    const client = new OAuth2Client(googleClientId);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });

    const googlePayload = ticket.getPayload();
    if (!googlePayload) throw new Error('Invalid token');

    let dbUser;
    if (googlePayload.email) {
      dbUser = await prisma.user.upsert({
        where: { email: googlePayload.email },
        update: {},
        create: { email: googlePayload.email },
      });
    } else {
      dbUser = await prisma.user.create({
        data: { email: `google:${googlePayload.sub}` },
      });
    }

    ctx.state.user = dbUser;

    await next();
  } catch (err: any) {
    console.error('Token verification error:', err.message || err);
    ctx.status = 401;
    ctx.body = { error: 'Invalid token' };
  }
}

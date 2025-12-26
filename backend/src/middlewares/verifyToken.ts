import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

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
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      ctx.state.user = payload;
      await next();
      return;
    } catch (err) {
      // not local --> try google token
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

    ctx.state.user = {
      id: googlePayload.sub,
      email: googlePayload.email,
      name: googlePayload.name,
      picture: googlePayload.picture,
      provider: 'google',
    };

    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid token' };
  }
}

import jwt from 'jsonwebtoken';

export async function verifyToken(ctx: any, next: any) {
  const authHeader = ctx.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Token missing' };
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    ctx.state.user = payload;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid token' };
  }
}

import type { Context, Next } from 'koa';

export async function errorHandler(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err: unknown) {
    const error = err as Error & { status?: number; statusCode?: number };

    const status = error.status ?? error.statusCode ?? 500;
    const message = status < 500 ? error.message : 'Internal server error';

    ctx.status = status;
    ctx.body = { error: message };

    if (status >= 500) {
      console.error({
        event: 'unhandled_error',
        method: ctx.method,
        path: ctx.path,
        status,
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });

      ctx.app.emit('error', err, ctx);
    }
  }
}

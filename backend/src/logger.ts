import { Context, Next } from 'koa';

export async function requestLogger(ctx: Context, next: Next) {
    console.log(`Request Method: ${ctx.method}`);
    console.log(`Request URL: ${ctx.url}`);
    console.log('Request Headers:', ctx.headers);

    // Optionally, you can log the request body if it's JSON or text
    if (ctx.is('application/json') || ctx.is('text/plain')) {
        console.log('Request Body:', ctx.request.body);
    }

    await next();

    // Log response status after processing the request
    console.log(`Response Status: ${ctx.status}`);
}

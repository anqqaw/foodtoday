import cors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';

import * as dinners from './dinners';
import * as users from './users';

import * as health from './health';

// import { requestLogger } from './logger';

import { verifyGoogleToken } from './middlewares/google';

export function createApp() {
  const app = new Koa();

  if (process.env.NODE_ENV !== 'test') {
    app.use(logger());
  }
  app.use(cors({ credentials: true }));
  app.use(bodyParser());

  // app.use(requestLogger);

  const publicRouter = new Router({ prefix: '/api' });

  publicRouter.get('/_health', health.check);

  app.use(publicRouter.routes());
  app.use(publicRouter.allowedMethods());

  const privateRouter = new Router({ prefix: '/api' });

  privateRouter.use(verifyGoogleToken);

  privateRouter.get('/dinners', dinners.searchDinners);
  privateRouter.get('/dinners/random', dinners.getRandom);
  privateRouter.get('/dinners/:id', dinners.getById);
  privateRouter.get('/dinners/:id/addtoshoppinglist', dinners.addToShoppingList);

  privateRouter.get('/users/shoppinglist', users.getShoppingList);

  app.use(privateRouter.routes());
  app.use(privateRouter.allowedMethods());

  return app;
}

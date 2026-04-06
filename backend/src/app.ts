import cors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';

import * as dinners from './dinners';
import * as users from './shoppingList';
import * as settings from './settings';

import * as health from './health';
import authRouter from './auth';

import { verifyToken } from './middlewares/verifyToken';
import { errorHandler } from './middlewares/errorHandler';

export function createApp() {
  const app = new Koa();

  if (process.env.NODE_ENV !== 'test') {
    app.use(logger());
  }
  app.use(errorHandler);
  app.use(cors({ credentials: true }));
  app.use(bodyParser());

  const publicRouter = new Router({ prefix: '/api' });

  publicRouter.get('/_health', health.check);
  publicRouter.use('/auth', authRouter.routes(), authRouter.allowedMethods());

  app.use(publicRouter.routes());
  app.use(publicRouter.allowedMethods());

  const privateRouter = new Router({ prefix: '/api' });

  privateRouter.use(verifyToken);

  privateRouter.get('/dinners', dinners.searchDinners);
  privateRouter.get('/dinners/random', dinners.getRandom);
  privateRouter.get('/dinners/:id', dinners.getById);
  privateRouter.get('/dinners/:id/addtoshoppinglist', dinners.addToShoppingList);

  privateRouter.get('/users/clearshoppinglist', users.clearShoppingList);
  privateRouter.get('/users/shoppinglist', users.getShoppingList);
  privateRouter.get('/users/createShoppingListItem', users.createShoppingListItem);
  privateRouter.delete('/users/shoppinglist/:id', users.deleteFromShoppingList);
  privateRouter.get('/users/shoppinglist/:id/toggle', users.toggleItemCompleted);

  privateRouter.get('/users/settings', settings.getSettings);
  privateRouter.put('/users/settings', settings.updateSettings);

  app.use(privateRouter.routes());
  app.use(privateRouter.allowedMethods());

  return app;
}

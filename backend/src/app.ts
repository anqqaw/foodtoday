import cors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';

import * as dinners from './dinners';
import * as users from './shoppingList';

import * as health from './health';

import { verifyGoogleToken } from './middlewares/google';

export function createApp() {
  const app = new Koa();

  if (process.env.NODE_ENV !== 'test') {
    app.use(logger());
  }
  app.use(cors({ credentials: true }));
  app.use(bodyParser());

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

  privateRouter.get('/users/clearshoppinglist', users.clearShoppingList);
  privateRouter.get('/users/shoppinglist', users.getShoppingList);
  privateRouter.get('users/createShoppingListItem', users.createShoppingListItem);
  privateRouter.delete('/users/shoppinglist/:id', users.deleteFromShoppingList);
  privateRouter.get('/users/shoppinglist/:id/toggle', users.toggleItemCompleted);

  app.use(privateRouter.routes());
  app.use(privateRouter.allowedMethods());

  return app;
}

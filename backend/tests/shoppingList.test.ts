import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { createApp } from '../src/app';
import * as google from '../src/middlewares/google';

jest.mock('../src/middlewares/google');

import { resetRedisMock } from './__mocks__/ioredis';

const prisma = new PrismaClient();
const app = createApp();
const server = request(app.callback());

describe('GET /users/shoppinglist/:id/toggle', () => {
  let user: any;
  let item: any;

  beforeEach(async () => {
    user = await prisma.user.create({
      data: { email: 'toggle-item@ai-extension.com' },
    });

    (google.verifyGoogleToken as jest.Mock).mockImplementation(async (ctx: any, next: any) => {
      ctx.state.user = user;
      await next();
    });

    item = await prisma.shoppingListItem.create({
      data: {
        title: 'Test Item',
        completed: false,
        userId: user.id,
      },
    });
  });

  afterEach(async () => {
    await prisma.shoppingListItem.deleteMany();
    await prisma.user.deleteMany();
    resetRedisMock();
  });

  it('toggles the completed status of a shopping list item', async () => {
    const res = await server
      .get(`/api/users/shoppinglist/${item.id}/toggle`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Item toggled');
    expect(res.body.shoppingList[0]).toMatchObject({
      id: item.id,
      completed: true,
    });
  });

  it('returns 404 if item does not exist', async () => {
    const res = await server
      .get(`/api/users/shoppinglist/999999/toggle`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 400 if no id is provided', async () => {
    const res = await server
      .get(`/api/users/shoppinglist/toggle`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(404);
  });

  it('returns 404 if item belongs to a different user', async () => {
    const otherUser = await prisma.user.create({
      data: { email: 'other@user.com' },
    });

    const otherItem = await prisma.shoppingListItem.create({
      data: {
        title: 'Other Item',
        completed: false,
        userId: otherUser.id,
      },
    });

    const res = await server
      .get(`/api/users/shoppinglist/${otherItem.id}/toggle`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Item not found or unauthorized');
  });
});

describe('DELETE /api/users/shoppinglist/:id', () => {
  let user: any;
  let item: any;

  beforeEach(async () => {
    user = await prisma.user.create({
      data: { email: 'delete-item@test.com ' },
    });

    (google.verifyGoogleToken as jest.Mock).mockImplementation(async (ctx: any, next: any) => {
      ctx.state.user = user;
      await next();
    });

    item = await prisma.shoppingListItem.create({
      data: {
        title: 'Test Item',
        completed: false,
        userId: user.id,
      },
    });
  });

  afterEach(async () => {
    await prisma.shoppingListItem.deleteMany();
    await prisma.user.deleteMany();
    resetRedisMock();
  });

  it('deletes an item from the shopping list', async () => {
    const res = await server
      .delete(`api/users/shoppinglist/${item.id}`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Item deleted from shopping list');
    expect(res.body.shoppingList.find((i: any) => i.id === item.id)).toBeUndefined();
  });

  it('returns 404 if item does not exist', async () => {
    const res = await server
      .delete(`api/users/shoppinglist/999999`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(404);
    expect(res.body).toBe("Item not found");
  });

  it('returns 400 if ID is missing from path', async () => {
    const res = await server
      .delete(`/api/users/shoppinglist/`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(400);
    expect(res.body).toBe("Item is required");
  });

  it('returns 404 if item belongs to a different user', async () => {
    const otherUser = await prisma.user.create({
      data: { email: 'other@test.com' },
    });

    const otherItem = await prisma.shoppingListItem.create({
      data: {
        title: 'Other Item',
        completed: false,
        userId: otherUser.id,
      },
    });

    const res = await server
      .delete(`/api/users/shoppinglist/${otherItem.id}`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Item not found');
  });

  it('returns 500 on internal server error', async () => {
    jest.spyOn(prisma.shoppingListItem, 'findFirst').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });

    const res = await server
      .delete(`/api/users/shoppinglist/${item.id}`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Internal server error');
  });
});

describe('GET /api/users/clearshoppinglist', () => {
  let user: any;

  beforeEach(async () => {
    user = await prisma.user.create({
      data: { email: 'clear@test.com' },
    });

    (google.verifyGoogleToken as jest.Mock).mockImplementation(async (ctx: any, next: any) => {
      ctx.state.user = user;
      await next();
    });

    await prisma.shoppingListItem.createMany({
      data: {
        title: "Test Item",
        completed: false,
        userId: user.id,
      },
    });
  });

  afterEach(async () => {
    await prisma.shoppingListItem.deleteMany();
    await prisma.user.deleteMany();
    resetRedisMock();
  });

  it('clears all the items from users shopping list', async () => {
    const res = await server
      .get(`/api/users/clearshoppinglist`)
      .set('Authorization', ' Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Shopping list cleared');
    expect(res.body.shoppingList).toEqual([]);

    const remaining = await prisma.shoppingListItem.findMany({
      where: { userId: user.id },
    });
    expect(remaining).toHaveLength(0);
  });

  it('returns 500 if something goes wrong', async () => {
    jest.spyOn(prisma.shoppingListItem, 'deleteMany').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });

    const res = await server
      .get(`/api/users/clearshoppinglist`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Internal server error');
  });
});

describe('GET /api/users/shoppinglist', () => {
  let user: any;

  beforeEach(async () => {
    user = await prisma.user.create({
      data: { email: 'get-list@test.com' },
    });

    (google.verifyGoogleToken as jest.Mock).mockImplementation(async (ctx: any, next: any) => {
      ctx.state.user = user;
      await next();
    });
  });

  afterEach(async () => {
    await prisma.shoppingListItem.deleteMany();
    await prisma.user.deleteMany();
    resetRedisMock();
  });

  it('returns a list of shopping items for the user', async () => {
    const res = await server
      .get(`/api/users/shoppinglist`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body.shoppingList).toHaveLength(3);
    expect(res.body.shoppingList[0]).toHaveProperty('name');
    expect(res.body.shoppingList[0]).toHaveProperty('qty');
  });

  it('returns an empty list if the user has no items', async () => {
    const res = await server
      .get(`/api/users/shoppinglist`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body.shoppingList).toEqual([]);
  });

  it('returns 500 if something goes wrong', async () => {
    jest.spyOn(prisma.shoppingListItem, 'findMany').mockImplementationOnce(() => {
      throw new Error('Internal server error');
    });

    const res = await server
      .get(`/api/users/shoppinglist`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Internal server error');
  });
});

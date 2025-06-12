import request from 'supertest';
import { createApp } from '../src/app';
import * as google from '../src/middlewares/verifyToken';
import { prisma } from '../src/prisma';

jest.mock('../src/middlewares/verifyToken');

const app = createApp();
const server = request(app.callback());

describe('GET /users/shoppinglist/:id/toggle', () => {
  let user: any;
  let item: any;

  beforeEach(async () => {
    user = await prisma.user.create({
      data: { email: 'toggle-item@ai-extension.com' },
    });

    (google.verifyToken as jest.Mock).mockImplementation(async (ctx: any, next: any) => {
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
      .get(`/api/users/shoppinglist//toggle`)
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

    (google.verifyToken as jest.Mock).mockImplementation(async (ctx: any, next: any) => {
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
    jest.restoreAllMocks();
  });

  it('deletes an item from the shopping list', async () => {
    const res = await server
      .delete(`/api/users/shoppinglist/${item.id}`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Item deleted from shopping list');
    expect(res.body.shoppingList.find((i: any) => i.id === item.id)).toBeUndefined();
  });

  it('returns 404 if item does not exist', async () => {
    const res = await server
      .delete(`/api/users/shoppinglist/999999`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Item not found');
  });

  it('returns 405 if ID is missing from path', async () => {
    const res = await server
      .delete(`/api/users/shoppinglist`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(405);
    expect(res.body).toEqual({});
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
});

describe('GET /api/users/clearshoppinglist', () => {
  let user: any;

  beforeEach(async () => {
    user = await prisma.user.create({
      data: { email: 'clear@test.com' },
    });

    (google.verifyToken as jest.Mock).mockImplementation(async (ctx: any, next: any) => {
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
    jest.restoreAllMocks();
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
});

describe('GET /api/users/shoppinglist', () => {
  let user: any;

  beforeEach(async () => {
    user = await prisma.user.create({
      data: { email: 'get-list@test.com' },
    });

    (google.verifyToken as jest.Mock).mockImplementation(
      async (ctx: any, next: any) => {
        ctx.state.user = user;
        await next();
      }
    );

    await prisma.shoppingListItem.createMany({
      data: [
        { title: 'Apple', completed: false, userId: user.id },
        { title: 'Banana', completed: true, userId: user.id },
        { title: 'Carrot', completed: false, userId: user.id },
      ],
    });
  });

  afterEach(async () => {
    await prisma.shoppingListItem.deleteMany();
    await prisma.user.deleteMany();
  });

  it('returns a list of shopping items for the user', async () => {
    const res = await server
      .get(`/api/users/shoppinglist`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body.shoppingList).toHaveLength(3);
    res.body.shoppingList.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('completed');
      expect(item).toHaveProperty('userId');
    });
  });

  it('returns an empty list if the user has no items', async () => {
    await prisma.shoppingListItem.deleteMany({ where: { userId: user.id } });

    const res = await server
      .get(`/api/users/shoppinglist`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body.shoppingList).toEqual([]);
  });

  describe('GET /api/dinners/:id/addtoshoppinglist', () => {
    let tempDinner: any;

    beforeEach(async () => {
      tempDinner = await prisma.dinner.create({
        data: {
          title: 'Test Dinner',
          description: 'Test Description',
          difficulty: 1,
          preparationTime: 30,
          totalTime: 60,
          serves: 4,
          shoppingList: [
            { title: 'Peruna', qty: 2, unit: 'kpl' },
            { title: 'Suola' }
          ],
        },
      });
    });

    it('should add the dinner to the users shopping list', async () => {
      const res = await server
        .get(`/api/dinners/${tempDinner!.id}/addtoshoppinglist`)
        .set('Authorization', 'Bearer mockToken');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Dinner added to shopping list');
      const added = res.body.shoppingList.find((i: any) => i.title === tempDinner!.title);
      expect(added).toBeDefined();
      expect(added.userId).toBe(user.id);
    });

    it('returns 404 if the dinner does not exist', async () => {
      const res = await server
        .get('/api/dinners/999999/addtoshoppinglist')
        .set('Authorization', 'Bearer mockToken');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'Dinner not found');
    });
  });
});

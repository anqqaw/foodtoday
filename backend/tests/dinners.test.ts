import { PrismaClient } from '@prisma/client';
import http from 'http';
import request from 'supertest';
import { createApp } from '../src/app';
import * as google from '../src/middlewares/google';

jest.mock('../src/middlewares/google');

import { resetRedisMock } from './__mocks__/ioredis';

const prisma = new PrismaClient();
const app = createApp();
const server = request(app.callback());

describe('Dinners', () => {
  beforeAll(async () => {
    await prisma.dinner.createMany({
      data: [
        { title: 'Dinner 1', description: 'Description 1', difficulty: 1, preparationTime: 30, totalTime: 60, serves: 4 },
        { title: 'Dinner 2', description: 'Description 2', difficulty: 2, preparationTime: 45, totalTime: 90, serves: 4 },
      ],
    });

    const user = await prisma.user.create({
      data: { email: 'test-dinners@ai-extension.com' },
    });

    (google.verifyGoogleToken as jest.Mock).mockImplementation(async (ctx: any, next: any) => {
      ctx.state.user = user;
      await next();
    });
  });

  afterEach(async () => {
    resetRedisMock();
  });

  it('GET /api/dinners - should return a list of dinners', async () => {
    const response = await server.get('/api/dinners').set('Authorization', 'Bearer mockToken');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('dinners');
    expect(response.body.dinners).toHaveLength(2);
    expect(response.body.dinners[0]).toHaveProperty('title');
    expect(response.body.dinners[0]).toHaveProperty('description');
    expect(response.body.dinners[0]).toHaveProperty('difficulty');
    expect(response.body.dinners[0]).toHaveProperty('preparationTime');
    expect(response.body.dinners[0]).toHaveProperty('totalTime');
  });

  // it('GET /api/dinners/random - should return a random dinner', async () => {})

  it('GET /api/dinners/:id - should return dinner details', async () => {
    const dinner = await prisma.dinner.findFirst();

    const res = await server
      .get(`/api/dinners/${dinner?.id}`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', dinner?.id);
    expect(res.body).toHaveProperty('title')
  })
});

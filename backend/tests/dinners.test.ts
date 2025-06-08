import request from 'supertest';
import { createApp } from '../src/app';
import { prisma } from '../src/prisma';
import * as google from '../src/middlewares/verifyToken';

jest.mock('../src/middlewares/verifyToken');

const app = createApp();
const server = request(app.callback());

describe('Dinners', () => {
  let user: any;

  beforeAll(async () => {
    await prisma.dinner.createMany({
      data: [
        {
          title: 'Dinner 1',
          description: 'Description 1',
          difficulty: 1,
          preparationTime: 30,
          totalTime: 60,
          serves: 4,
        },
        {
          title: 'Dinner 2',
          description: 'Description 2',
          difficulty: 2,
          preparationTime: 45,
          totalTime: 90,
          serves: 4,
        },
      ],
    });

    user = await prisma.user.create({
      data: { email: 'test-dinners@ai-extension.com' },
    });
    (google.verifyToken as jest.Mock).mockImplementation(
      async (ctx: any, next: any) => {
        ctx.state.user = user;
        await next();
      }
    );
  });

  afterAll(async () => {
    await prisma.dinner.deleteMany();
    await prisma.user.deleteMany();
  });

  it('GET /api/dinners - should return a list of dinners', async () => {
    const res = await server
      .get('/api/dinners')
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('dinners');

    res.body.dinners.forEach((dinner: any) => {
      expect(dinner).toHaveProperty('title');
      expect(dinner).toHaveProperty('description');
      expect(dinner).toHaveProperty('difficulty');
      expect(dinner).toHaveProperty('preparationTime');
      expect(dinner).toHaveProperty('totalTime');
      expect(dinner).toHaveProperty('serves');
    });
  });

  describe('GET /api/dinners/random', () => {
    it('should return a random dinner', async () => {
      const res = await server
        .get('/api/dinners/random')
        .set('Authorization', 'Bearer mockToken');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('dinner');
      expect(res.body.dinner).toHaveProperty('id');
      expect(res.body.dinner).toHaveProperty('title');
      expect(res.body.dinner).toHaveProperty('description');
      expect(res.body.dinner).toHaveProperty('difficulty');
      expect(res.body.dinner).toHaveProperty('preparationTime');
      expect(res.body.dinner).toHaveProperty('totalTime');
      expect(res.body.dinner).toHaveProperty('serves');
    });
  });

  it('GET /api/dinners/:id - should return dinner details', async () => {
    const dinner = await prisma.dinner.findFirst();
    const res = await server
      .get(`/api/dinners/${dinner!.id}`)
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', dinner!.id);
    expect(res.body).toHaveProperty('title', dinner!.title);
    expect(res.body).toHaveProperty('description', dinner!.description);
  });

  it('GET /api/dinners/999999 - should return 404 for non-existing dinner', async () => {
    const res = await server
      .get('/api/dinners/999999')
      .set('Authorization', 'Bearer mockToken');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Dinner not found');
  });
});

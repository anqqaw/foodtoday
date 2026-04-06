import request from 'supertest';
import { createApp } from '../src/app';
import { prisma } from '../src/prisma';
import * as google from '../src/middlewares/verifyToken';

jest.mock('../src/middlewares/verifyToken');

const app = createApp();
const server = request(app.callback());

describe('User Settings', () => {
  let user: any;

  beforeEach(async () => {
    user = await prisma.user.create({
      data: { email: 'settings-test@ai-extension.com' },
    });

    (google.verifyToken as jest.Mock).mockImplementation(async (ctx: any, next: any) => {
      ctx.state.user = user;
      await next();
    });
  });

  afterEach(async () => {
    await prisma.userSettings.deleteMany({ where: { userId: user.id } });
    await prisma.user.deleteMany({ where: { id: user.id } });
  });

  describe('GET /api/users/settings', () => {
    it('returns default settings when none exist', async () => {
      const res = await server
        .get('/api/users/settings')
        .set('Authorization', 'Bearer mockToken');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('settings');
      expect(res.body.settings).toMatchObject({ darkMode: false });
    });

    it('returns saved settings when they exist', async () => {
      await prisma.userSettings.create({
        data: { userId: user.id, darkMode: true },
      });

      const res = await server
        .get('/api/users/settings')
        .set('Authorization', 'Bearer mockToken');

      expect(res.status).toBe(200);
      expect(res.body.settings).toMatchObject({ darkMode: true });
    });
  });

  describe('PUT /api/users/settings', () => {
    it('creates settings when none exist', async () => {
      const res = await server
        .put('/api/users/settings')
        .set('Authorization', 'Bearer mockToken')
        .send({ darkMode: true });

      expect(res.status).toBe(200);
      expect(res.body.settings).toMatchObject({ darkMode: true });

      const stored = await prisma.userSettings.findUnique({ where: { userId: user.id } });
      expect(stored?.darkMode).toBe(true);
    });

    it('updates existing settings', async () => {
      await prisma.userSettings.create({
        data: { userId: user.id, darkMode: false },
      });

      const res = await server
        .put('/api/users/settings')
        .set('Authorization', 'Bearer mockToken')
        .send({ darkMode: true });

      expect(res.status).toBe(200);
      expect(res.body.settings).toMatchObject({ darkMode: true });
    });

    it('ignores unknown fields and only updates darkMode', async () => {
      const res = await server
        .put('/api/users/settings')
        .set('Authorization', 'Bearer mockToken')
        .send({ darkMode: false, unknownField: 'x' });

      expect(res.status).toBe(200);
      expect(res.body.settings).toMatchObject({ darkMode: false });
      expect(res.body.settings).not.toHaveProperty('unknownField');
    });
  });
});

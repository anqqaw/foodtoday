import { PrismaClient } from '@prisma/client';
import http from 'http';
import { Server } from 'socket.io';
import request from 'supertest';
import { createApp } from '../src/app';
import * as google from '../src/middlewares/google';

jest.mock('../src/middlewares/google');

import { resetRedisMock } from './__mocks__/ioredis';

const prisma = new PrismaClient();
const app = createApp(new Server(http.createServer()));
const server = request(app.callback());

describe('Rate Limiting', () => {
  beforeAll(async () => {
    const user = await prisma.user.create({
      data: { email: 'test-rate-limit@ai-extension.com' },
    });

    (google.verifyGoogleToken as jest.Mock).mockImplementation(async (ctx: any, next: any) => {
      ctx.state.user = user;
      await next();
    });
  });

  afterEach(async () => {
    resetRedisMock();
  });

  it('should allow dinners within the rate limit', async () => {
    for (let i = 0; i < 5; i++) {
      const response = await server.get('/api/dinners').set('Authorization', 'Bearer mockToken');
      expect(response.status).toBe(200);
    }
  });

  it('should block dinners exceeding the rate limit', async () => {
    // Send 5 allowed requests
    for (let i = 0; i < 5; i++) {
      const preResponse = await server.get('/api/dinners').set('Authorization', 'Bearer mockToken');
      expect(preResponse.status).toBe(200);
    }

    // Send 6th request to exceed the rate limit
    const exceedingAction = { action: 'summary', url: 'http://example.com', inputText: 'Exceeding request', pageContent: 'Test content' };
    const response = await server.get('/api/dinners').set('Authorization', 'Bearer mockToken').send(exceedingAction);
    expect(response.status).toBe(429); // Too Many Requests
    expect(response.body).toHaveProperty('error', 'Rate limit exceeded. Please try again later.');
  });
});

import request from 'supertest';
import { createApp } from '../src/app';
import { prisma } from '../src/prisma';

const app = createApp();
const server = request(app.callback());

describe('POST /api/auth/register', () => {
  afterEach(async () => {
    await prisma.user.deleteMany({ where: { email: { contains: 'auth-test' } } });
  });

  it('registers a new user and returns a token', async () => {
    const res = await server
      .post('/api/auth/register')
      .send({ email: 'auth-test-register@example.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('returns 400 when email is missing', async () => {
    const res = await server
      .post('/api/auth/register')
      .send({ password: 'password123' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 400 when password is missing', async () => {
    const res = await server
      .post('/api/auth/register')
      .send({ email: 'auth-test-nopw@example.com' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 409 when user already exists', async () => {
    const email = 'auth-test-duplicate@example.com';
    await server.post('/api/auth/register').send({ email, password: 'password123' });

    const res = await server
      .post('/api/auth/register')
      .send({ email, password: 'password123' });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('error');
  });
});

describe('POST /api/auth/login', () => {
  const email = 'auth-test-login@example.com';
  const password = 'secret123';

  beforeAll(async () => {
    await server.post('/api/auth/register').send({ email, password });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
  });

  it('logs in with correct credentials and returns a token', async () => {
    const res = await server.post('/api/auth/login').send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('returns 401 with wrong password', async () => {
    const res = await server
      .post('/api/auth/login')
      .send({ email, password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 401 for non-existent user', async () => {
    const res = await server
      .post('/api/auth/login')
      .send({ email: 'auth-test-ghost@example.com', password: 'password' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 400 when email is missing', async () => {
    const res = await server.post('/api/auth/login').send({ password });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 400 when password is missing', async () => {
    const res = await server.post('/api/auth/login').send({ email });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

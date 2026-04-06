import { Context } from 'koa';
import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export const getSettings = async (ctx: Context) => {
  const { user } = ctx.state;

  try {
    const found = await prisma.user.findUnique({
      where: { id: user.id },
      select: { settings: true },
    });

    ctx.status = 200;
    ctx.body = { settings: found?.settings ?? {} };
  } catch (error) {
    console.error('Error fetching settings:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const updateSettings = async (ctx: Context) => {
  const { user } = ctx.state;
  const incoming = ctx.request.body as Record<string, unknown>;

  if (!incoming || typeof incoming !== 'object') {
    ctx.status = 400;
    ctx.body = { error: 'Invalid settings payload' };
    return;
  }

  try {
    const current = await prisma.user.findUnique({
      where: { id: user.id },
      select: { settings: true },
    });

    const merged = {
      ...(typeof current?.settings === 'object' && current.settings !== null
        ? (current.settings as Record<string, unknown>)
        : {}),
      ...incoming,
    };

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { settings: merged as Prisma.InputJsonValue },
      select: { settings: true },
    });

    ctx.status = 200;
    ctx.body = { settings: updated.settings };
  } catch (error) {
    console.error('Error updating settings:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

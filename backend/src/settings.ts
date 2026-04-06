import { Context } from 'koa';
import { prisma } from './prisma';

export const getSettings = async (ctx: Context) => {
  const { user } = ctx.state;

  try {
    const settings = await prisma.userSettings.findUnique({
      where: { userId: user.id },
    });

    ctx.status = 200;
    ctx.body = { settings: { darkMode: settings?.darkMode ?? false } };
  } catch (error) {
    console.error('Error fetching settings:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

export const updateSettings = async (ctx: Context) => {
  const { user } = ctx.state;
  const body = ctx.request.body as { darkMode?: boolean };

  if (!body || typeof body !== 'object') {
    ctx.status = 400;
    ctx.body = { error: 'Invalid settings payload' };
    return;
  }

  try {
    const settings = await prisma.userSettings.upsert({
      where: { userId: user.id },
      update: {
        ...(typeof body.darkMode === 'boolean' && { darkMode: body.darkMode }),
      },
      create: {
        userId: user.id,
        darkMode: body.darkMode ?? false,
      },
    });

    ctx.status = 200;
    ctx.body = { settings: { darkMode: settings.darkMode } };
  } catch (error) {
    console.error('Error updating settings:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

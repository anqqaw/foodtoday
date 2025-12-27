import { Context } from "koa";
import { prisma } from './prisma';

export const getById = async (ctx: Context) => {
  const { id } = ctx.params;

  if (!id) {
    ctx.status = 400;
    ctx.body = { error: "ID parameter is required" };
    return;
  }

  try {
    const dinner = await prisma.dinner.findUnique({
      where: { id: Number(id) }
    });

    if (!dinner) {
      ctx.status = 404;
      ctx.body = { error: "Dinner not found" };
      return;
    }

    ctx.body = dinner;
  } catch (error) {
    console.error("Error fetching dinner details:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

export const searchDinners = async (ctx: Context) => {
  const { query } = ctx.request.query;

  try {
    let dinners;

    if (!query || typeof query !== "string" || query.trim() === "") {
      dinners = await prisma.dinner.findMany({
        orderBy: { title: "asc" },
      });
    } else {
      dinners = await prisma.dinner.findMany({
        where: {
          title: {
            contains: query.trim(),
            mode: "insensitive",
          },
        },
        orderBy: { title: "asc" },
        take: 10,
      });
    }

    ctx.body = { dinners };
  } catch (error) {
    console.error("Error searching for dinners:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error." };
  }
};

export const getRandom = async (ctx: Context) => {
  try {
    const count = await prisma.dinner.count();

    if (count === 0) {
      ctx.status = 404;
      ctx.body = { error: "No dinners available" };
      return;
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomDinner = await prisma.dinner.findMany({
      skip: randomIndex,
      take: 1,
    });

    if (randomDinner.length > 0) {
      ctx.body = { dinner: randomDinner[0] };
    } else {
      ctx.status = 404;
      ctx.body = { error: "Random dinner not found" };
    }
  } catch (error) {
    console.error("Error fetching random dinner:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

export const addToShoppingList = async (ctx: Context) => {
  const { id } = ctx.params;
  const { user } = ctx.state;

  if (!id) {
    ctx.status = 400;
    ctx.body = { error: 'ID parameter is required' };
    return;
  }

  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    ctx.status = 400;
    ctx.body = { error: 'ID must be a number' };
    return;
  }

  try {
    const dinner = await prisma.dinner.findUnique({
      where: { id: idNumber },
    });

    if (!dinner) {
      ctx.status = 404;
      ctx.body = { error: 'Dinner not found' };
      return;
    }

    if (!Array.isArray(dinner.shoppingList)) {
      ctx.status = 400;
      ctx.body = { error: 'Dinner does not contain a valid shopping list' };
      return;
    }

    for (const item of dinner.shoppingList as any[]) {
      if (!item || typeof item !== 'object' || !item.name) {
        continue;
      }

      const title =
        item.qty && item.unit
          ? `${item.qty} ${item.unit} ${item.name}`
          : item.name;

      await prisma.shoppingListItem.create({
        data: {
          title,
          completed: false,
          userId: user.id,
        },
      });
    }

    const shoppingList = await prisma.shoppingListItem.findMany({
      where: { userId: user.id },
      orderBy: { id: 'asc' },
    });

    ctx.status = 200;
    ctx.body = {
      message: 'Dinner added to shopping list',
      shoppingList,
    };
  } catch (error) {
    console.error('Error adding dinner to shopping list:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

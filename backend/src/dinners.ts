import { Context } from "koa";
// import { PrismaClient } from "@prisma/client";
import prisma from './prisma';

// const prisma = new PrismaClient();

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
    ctx.body = { error: "ID parameter is required" };
    return;
  }

  try {
    const dinner = await prisma.dinner.findUnique({
      where: { id: Number(id) },
      select: { shoppingList: true },
    });

    if (!dinner?.shoppingList || !Array.isArray(dinner.shoppingList)) {
      ctx.status = 400;
      ctx.body = { error: "ShoppingList is not defined and formatted as an array." };
      return;
    }

    const createdItems = [];

    for (const item of dinner.shoppingList as { qty?: number | string; unit?: string; name: string }[]) {
      const title = [item.qty ?? '', item.unit ?? '', item.name]
        .filter(Boolean)
        .join(' ')
        .trim();

      const created = await prisma.shoppingListItem.create({
        data: {
          title,
          userId: user.id,
        },
      });

      createdItems.push(created);
    }

    ctx.status = 200;
    ctx.body = {
      message: "Items added to shopping list",
      shoppingList: createdItems,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

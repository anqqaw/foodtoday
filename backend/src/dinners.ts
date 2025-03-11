import { Context } from "koa";
import { PrismaClient } from "@prisma/client";
import { JsonArray } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

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
    // Fetch the dinner and its shopping list
    const dinner = await prisma.dinner.findUnique({
      where: { id: Number(id) },
      select: { shoppingList: true, id: true },
    });

    if (!dinner) {
      ctx.status = 404;
      ctx.body = { error: "Dinner not found" };
      return;
    }

    if (!Array.isArray(dinner.shoppingList)) {
      ctx.status = 400;
      ctx.body = { error: "Dinner does not have a valid shopping list" };
      return;
    }

    // Convert the shopping list into a formatted string
    const shoppingListArray = dinner.shoppingList as { qty?: number; unit?: string; name: string }[];
    const shoppingListString = shoppingListArray
      .map(item => `${item.qty ? item.qty + (item.unit ? ` ${item.unit} ` : " ") : ""}${item.name}`)
      .join(', ');

    // Create a new shopping list entry
    const shoppingList = await prisma.shoppingList.create({
      data: {
        title: shoppingListString,
        userId: user.id, // Use the authenticated user's ID
      },
    });

    console.log("Shopping list converted:", shoppingList);

    // Fetch updated shopping list for the user
    const updatedShoppingList = await prisma.shoppingList.findMany({
      where: { userId: user.id },
    });

    ctx.status = 200;
    ctx.body = { message: "Shopping list converted and added", shoppingList: updatedShoppingList };
  } catch (e) {
    console.error("Error adding to shopping list:", e);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

import { Context } from "koa";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const list = async (ctx: Context) => {
  try {
    const dinners = await prisma.dinner.findMany({
      orderBy: { title: "asc" },
    });
    ctx.body = { dinners };
  } catch (error) {
    console.error("Error fetching dinners:", error);
    ctx.status = 500;
    ctx.body = { error: "Error fetching dinners" };
  }
};

export const getById = async (ctx: Context) => {
  const { id } = ctx.params;

  if (!id) {
    ctx.status = 400;
    ctx.body = { error: "ID parameter is required" };
    return;
  }

  console.log(id);

  try {
    const dinner = await prisma.dinner.findUnique({
      where: { id: parseInt(id) }
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

  if (!query || typeof query !== "string") {
    ctx.status = 400;
    ctx.body = { error: "A valid search query is required." };
    return;
  }

  try {
    const results = await prisma.dinner.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 10,
    });

    ctx.body = { dinners: results };
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

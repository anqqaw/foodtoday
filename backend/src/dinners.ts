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

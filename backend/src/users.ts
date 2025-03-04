import { Context } from "koa";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getShoppingList = async (ctx: Context) => {
  const { user } = ctx.state;

  ctx.body = user.shoppingList;
};

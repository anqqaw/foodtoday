import { Context } from "koa";
import { PrismaClient } from "@prisma/client";
import { isReturnStatement } from "typescript";

const prisma = new PrismaClient();

export const getShoppingList = async (ctx: Context) => {
  const { user } = ctx.state;

  try {
    const userShoppingList = await prisma.user.findUnique({
      where: { id: user.id },
      include: { shoppinglists: true },
    })

    ctx.status = 200;
    ctx.body = { shoppingList: userShoppingList?.shoppinglists ?? [] }

  } catch (error) {
    console.error("Error fetching shopping list:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }

  ctx.body = user.shoppingList;
};

export const clearShoppingList = async (ctx: Context) => {
  const { user } = ctx.state;

  try {
    await prisma.shoppingList.deleteMany({
      where: { userId: user.id },
    });

    ctx.status = 200;
    ctx.body = { message: "Shopping list cleared", shoppingList: [] };
  } catch (error) {
    console.log("Error clearing shopping list:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

export const deleteFromShoppingList = async (ctx: Context) => {
  const { item } = ctx.request.body as any;
  const { user } = ctx.state;

  if (!item) {
    ctx.status = 400;
    ctx.body = { error: "Item is required" };
    return;
  }

  try {
    const shoppingItem = await prisma.shoppingList.findFirst({
      where: { title: item, userId: user.id },
    });

    if (!shoppingItem) {
      ctx.status = 404;
      ctx.body = { error: "Item not found in shopping list" };
      return;
    }

    await prisma.shoppingList.delete({
      where: { id: shoppingItem.id },
    });

    const updatedShoppingList = await prisma.shoppingList.findMany({
      where: { userId: user.id },
    });

    ctx.status = 200;
    ctx.body = { message: "Item deleted from shopping list", shoppingList: updatedShoppingList };
  } catch (error) {
    console.log("Error deleting item from shopping list:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

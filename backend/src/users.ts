import { Context } from "koa";
import { PrismaClient } from "@prisma/client";
import { isReturnStatement } from "typescript";

const prisma = new PrismaClient();

export const getShoppingList = async (ctx: Context) => {
  const { user } = ctx.state;

  ctx.body = user.shoppingList;
};

export const clearShoppingList = async (ctx: Context) => {
  const { user } = ctx.state;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        shoppingList: [],
      }
    });

    ctx.status = 200;
    ctx.body = { message: "Shopping list cleared", shoppingList: updatedUser.shoppingList };
  } catch (error) {
    console.log("Error clearing shopping list:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

export const deleteFromShoppingList = async (ctx: Context) => {
  const { item } = ctx.request.body as any;
  const { user } = ctx.state;

  console.log("Item to delete:", item);
  console.log("User:", user);

  if (!item) {
    ctx.status = 400;
    ctx.body = { error: "Item is required" };
    return;
  }

  try {
    const currentShoppingList: any[] = user.shoppingList || [];

    const updatedShoppingList = currentShoppingList.filter(i => i.name !== item);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        shoppingList: updatedShoppingList,
      }
    });

    ctx.status = 200;
    ctx.body = { message: "Item deleted from shopping list", shoppingList: updatedUser.shoppingList };
  } catch (error) {
    console.log("Error deleting item from shopping list:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

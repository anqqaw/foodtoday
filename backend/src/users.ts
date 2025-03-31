import { Context } from "koa";
import { PrismaClient } from "@prisma/client";
import { isReturnStatement } from "typescript";

const prisma = new PrismaClient();

export const getShoppingList = async (ctx: Context) => {
  const { user } = ctx.state;

  try {
    const userShoppingList = await prisma.user.findUnique({
      where: { id: user.id },
      include: { shoppingListItems: true },
    })

    ctx.status = 200;
    ctx.body = { shoppingList: userShoppingList?.shoppingListItems || [] };

  } catch (error) {
    console.error("Error fetching shopping list:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

export const clearShoppingList = async (ctx: Context) => {
  const { user } = ctx.state;

  try {
    await prisma.shoppingListItem.deleteMany({
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
  const { id } = ctx.params;
  const { user } = ctx.state;

  if (!id) {
    ctx.status = 400;
    ctx.body = { error: "Item is required" };
    return;
  }

  try {
    const shoppingItem = await prisma.shoppingListItem.findFirst({
      where: {
        id,
        userId: user.id
      },
    });

    if (!shoppingItem) {
      ctx.status = 404;
      ctx.body = { error: "Item not found" };
      return;
    }

    await prisma.shoppingListItem.delete({
      where: { id },
    });

    const updatedShoppingList = await prisma.shoppingListItem.findMany({
      where: { userId: user.id },
    });

    ctx.status = 200;
    ctx.body = {
      message: "Item deleted from shopping list",
      shoppingList: updatedShoppingList,
    };
  } catch (error) {
    console.error("Error deleting item from shopping list:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

export const toggleItemCompleted = async (ctx: Context) => {
  const id = Number(ctx.request.query.id);
  const { user } = ctx.state;

  if (!id) {
    ctx.status = 400;
    ctx.body = { error: "ID is required" };
    return;
  }

  try {
    const item = await prisma.shoppingListItem.findFirst({
      where: { id },
    });

    if (!item || item.userId !== user.id) {
      ctx.status = 404;
      ctx.body = { error: "Item not found or unauthorized" };
      return;
    }

    const updatedItem = await prisma.shoppingListItem.update({
      where: { id },
      data: { completed: !item.completed },
    });

    ctx.status = 200;
    ctx.body = {
      message: `Item ${updatedItem.completed ? "marked as completed" : "marked as uncompleted"}`,
      item: updatedItem,
    }
  } catch (error) {
    console.error("Error toggling item completed:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

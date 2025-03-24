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
    await prisma.shoppingListItems.deleteMany({
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
  const { id } = ctx.request.body as any;
  const { user } = ctx.state;

  if (!id) {
    ctx.status = 400;
    ctx.body = { error: "Item is required" };
    return;
  }

  try {
    const shoppingItem = await prisma.shoppingListItems.findFirst({
      where: {
        userId: user.id,
        title: {
          contains: id,
        },
      },
    });

    if (!shoppingItem) {
      ctx.status = 404;
      ctx.body = { error: "Item not found in shopping list" };
      return;
    }

    const itemsArray = shoppingItem.title.split(",").map(i => i.trim());
    const updatedItems = itemsArray.filter(i => i !== id);

    if (updatedItems.length === 0) {
      await prisma.shoppingListItems.delete({
        where: { id: shoppingItem.id },
      });
    } else {
      await prisma.shoppingListItems.update({
        where: { id: shoppingItem.id },
        data: { title: updatedItems.join(", ") },
      });
    }

    const updatedShoppingList = await prisma.shoppingListItems.findMany({
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
  const { id } = ctx.request.body as any;
  const { user } = ctx.state;

  if (!id) {
    ctx.status = 400;
    ctx.body = { error: "ID is required" };
    return;
  }

  try {
    const item = await prisma.shoppingListItems.findFirst({
      where: { id },
    });

    if (!item || item.userId !== user.id) {
      ctx.status = 404;
      ctx.body = { error: "Item not found or unauthorized" };
      return;
    }

    const updatedItem = await prisma.shoppingListItems.update({
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

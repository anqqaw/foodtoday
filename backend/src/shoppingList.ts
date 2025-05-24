import { Context } from "koa";
import { prisma } from './prisma';

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

  const idNumber = Number(id);

  if (!id || isNaN(idNumber)) {
    ctx.status = 400;
    ctx.body = { error: "Item is required" };
    return;
  }

  try {
    const shoppingItem = await prisma.shoppingListItem.findFirst({
      where: {
        id: idNumber,
        userId: user.id
      },
    });

    if (!shoppingItem) {
      ctx.status = 404;
      ctx.body = { error: "Item not found" };
      return;
    }

    await prisma.shoppingListItem.delete({
      where: { id: idNumber },
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
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

export const toggleItemCompleted = async (ctx: Context) => {
  const { id } = ctx.params;
  const { user } = ctx.state;

  const idNumber = Number(id);

  if (!id || isNaN(idNumber)) {
    ctx.status = 400;
    ctx.body = { error: "Valid ID is required" };
    return;
  }

  try {
    const item = await prisma.shoppingListItem.findFirst({
      where: { id: idNumber },
    });

    if (!item || item.userId !== user.id) {
      ctx.status = 404;
      ctx.body = { error: "Item not found or unauthorized" };
      return;
    }

    await prisma.shoppingListItem.update({
      where: { id: idNumber },
      data: { completed: !item.completed },
    });

    const updatedShoppingList = await prisma.shoppingListItem.findMany({
      where: { userId: user.id },
      orderBy: { id: "asc" },
    });

    ctx.status = 200;
    ctx.body = {
      message: "Item toggled",
      shoppingList: updatedShoppingList,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

export const addToShoppingList = async (ctx: Context) => {
  const { id } = ctx.params;
  const { user } = ctx.state;

  if (!id) {
    ctx.status = 400;
    ctx.body = { error: "Dinner ID is required" };
    return;
  }

  const dinnerId = Number(id);
  if (isNaN(dinnerId)) {
    ctx.status = 400;
    ctx.body = { error: "Dinner ID must be a number" };
    return;
  }

  try {
    // fetch the dinner with its shoppingList JSON
    const dinner = await prisma.dinner.findUnique({
      where: { id: dinnerId },
      select: { shoppingList: true },
    });

    if (!dinner || !Array.isArray(dinner.shoppingList)) {
      ctx.status = 404;
      ctx.body = { error: "Dinner or its shopping list not found" };
      return;
    }

    for (const item of dinner.shoppingList as any[]) {
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
      orderBy: { id: "desc" },
    });

    ctx.status = 200;
    ctx.body = {
      message: "Dinner ingredients added to shopping list",
      shoppingList,
    };
  } catch (error) {
    console.error("Error adding to shopping list:", error);
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

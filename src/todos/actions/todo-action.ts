"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const sleep = async (seconds = 2) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 100);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo con id ${id} no encontrado`;
  }

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete: complete },
  });

  revalidateTag("/dashboard/server-todos");

  return updateTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });

    revalidateTag("/dashboard/server-todos");

    return todo;
  } catch (error) {
    return {
      message: "Error creando todo",
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });
    revalidateTag("/dashboard/server-todos");
  } catch (error) {}
};

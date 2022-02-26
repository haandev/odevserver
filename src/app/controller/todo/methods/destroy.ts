import { Category } from "@/app/model/Category";
import { Todo } from "@/app/model/Todo";
import { RequestHandler } from "express";

export const destroy: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;

    const todo = await Todo.findOne({ where: { id: Number(id) } });

    if (todo.userId !== request.authUser.id) response.status(403).send("Unauthorized");

    todo.destroy();
    response.status(200).send("Deleted");
  } catch {
    response.status(500).send("Server error");
  }
};

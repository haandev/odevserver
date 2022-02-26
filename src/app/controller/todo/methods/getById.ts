import { Todo } from "@/app/model/Todo";
import { RequestHandler } from "express";

export const getById: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;
    const todo = await Todo.findOne({
      where: { id: Number(id), userId: Number(request.authUser.id) },
    });
    response.status(200).send(todo);
  } catch {
    response.status(500).send("Server error");
  }
};

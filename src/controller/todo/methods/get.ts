import { Todo } from "@/model/Todo";
import { RequestHandler } from "@ooic/core";

export const get: RequestHandler = async (request, response) => {
  try {
    const todos = await Todo.findAll({ where: { userId: request.authUser.id } });
    response.status(200).send(todos);
  } catch {
    response.status(500).send("Server error");
  }
};

import { Todo } from "@/model/Todo";
import { RequestHandler } from "@ooic/core";

export const get: RequestHandler = async (request, response, next) => {
  try {
    const todos = await Todo.findAll({ where: { userId: request.authUser.id } });
    response.status(200).send(todos);
  } catch (error) {
    next(error)
  }
};

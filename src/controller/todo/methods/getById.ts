import { Todo } from "@/model/Todo";
import { RequestHandler } from "@ooic/core";

export const getById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const todo = await Todo.findOne({
      where: { id: Number(id), userId: Number(request.authUser.id) },
    });
    response.status(200).send(todo);
  } catch (error) {
    next(error)
  }
};

import { Category } from "@/model/Category";
import { Todo } from "@/model/Todo";
import { RequestHandler } from "@ooic/core";

export const destroy: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    const todo = await Todo.findOne({ where: { id: Number(id) } });

    if (todo.userId !== request.authUser.id) response.status(403).send("Unauthorized");

    todo.destroy();
    response.status(200).send("Deleted");
  } catch (error) {
    next(error)
  }
};

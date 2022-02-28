import { Todo } from "@/model/Todo";
import { RequestHandler } from "@ooic/core";

export const update: RequestHandler = async (request, response) => {
  try {
    const { id } = request.params;

    const todo = await Todo.findOne({ where: { id: Number(id) } });

    if (todo.userId !== request.authUser.id) response.status(403).send("Unauthorized");

    todo.update(request.body);
    response.status(200).send(todo);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};

import { Todo } from "@/model/Todo";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const getById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);
    const todo = await Todo.findOne({
      where: { id: Number(id), userId: Number(request.authUser.id) },
    });
    response.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};

export default getById;

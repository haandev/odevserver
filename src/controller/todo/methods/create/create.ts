import { RequestHandler } from "@ooic/core";
import { Todo } from "@/model/Todo";
import { schema } from ".";

const create: RequestHandler = async (request, response, next) => {
  try {
    const result = await Todo.create({ userId: request.authUser.id, ...schema.body.parse(request.body) });
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export default create;
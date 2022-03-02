import { Todo } from "@/model/Todo";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";
const get: RequestHandler = async (request, response, next) => {
  try {
    const query = schema.query.parse(request.query);
    const todos = await Todo.findAll({ where: { userId: request.authUser.id, ...query } });
    response.status(200).send(todos);
  } catch (error) {
    next(error);
  }
};

export default get;

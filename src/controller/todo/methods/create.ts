import { RequestHandler } from "@ooic/core";
import { Todo } from "@/model/Todo";
export const create: RequestHandler = async (request, response) => {
  try {
    const result = await Todo.create({ userId: request.authUser.id, ...request.body });
    response.send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};

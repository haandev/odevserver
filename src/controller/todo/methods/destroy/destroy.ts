import { Category } from "@/model/Category";
import { Todo } from "@/model/Todo";
import { RequestHandler } from "@ooic/core";
import { schema } from ".";

const destroy: RequestHandler = async (request, response, next) => {
  try {
    const { id } = schema.params.parse(request.params);

    const todo = await Todo.findOne({ where: { id: Number(id) } });

    if (todo.userId !== request.authUser.id) throw { statusCode: 403, message: "Unauthorized" };

    todo.destroy();
    response.status(200).send("Deleted");
  } catch (error) {
    next(error);
  }
};

export default destroy;

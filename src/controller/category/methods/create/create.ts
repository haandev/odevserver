import { RequestHandler } from "@ooic/core";
import { Category } from "@/model/Category";
import { schema } from ".";

const create: RequestHandler = async (request, response, next) => {
  try {
    schema.body.parse(request.body);
    const result = await Category.create({ userId: request.authUser.id, ...request.body });
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export default create
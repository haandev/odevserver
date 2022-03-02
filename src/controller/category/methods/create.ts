import { RequestHandler } from "@ooic/core";
import { Category } from "@/model/Category";
import { bodySchema } from "./create.schema";
export const create: RequestHandler = async (request, response, next) => {
  try {
    bodySchema.parse(request.body);
    const result = await Category.create({ userId: request.authUser.id, ...request.body });
    response.send(result);
  } catch (error) {
    next(error)
  }
};

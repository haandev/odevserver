import { Category } from "@/model/Category";
import { RequestHandler } from "@ooic/core";
import { paramsSchema } from "./getById.schema";

export const getById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = paramsSchema.parse(request.params);
    const category = await Category.findOne({
      where: { id: Number(id), userId: Number(request.authUser.id) },
    });
    response.status(200).send(category);
  } catch (error) {
    next(error)
  }
};

import { Category } from "@/model/Category";
import { RequestHandler } from "@ooic/core";
import { bodySchema, paramsSchema } from "./update.schema";
export const update: RequestHandler = async (request, response, next) => {
  try {
    const { id } = paramsSchema.parse(request.params);

    const category = await Category.findOne({ where: { id: Number(id) } });

    if (category.userId !== request.authUser.id) throw { statusCode: 403, message: "Unauthorized" };

    category.update(bodySchema.parse(request.body));
    response.status(200).send(category);
  } catch (error) {
    next(error);
  }
};

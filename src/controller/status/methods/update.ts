import { Category } from "@/model/Category";
import { Status } from "@/model/Status";
import { RequestHandler } from "@ooic/core";
import { paramsSchema, bodySchema } from "./update.schema";
export const update: RequestHandler = async (request, response, next) => {
  try {
    const { id } = paramsSchema.parse(request.params);

    const status = await Status.findOne({ where: { id: Number(id) }, include: Category });

    if (status.Category.userId !== request.authUser.id) throw { statusCode: 403, message: "Unauthorized" };

    status.update(bodySchema.parse(request.body));
    response.status(200).send(status);
  } catch (error) {
    next(error);
  }
};

import { Category } from "@/model/Category";
import { Status } from "@/model/Status";
import { RequestHandler } from "@ooic/core";
import { paramsSchema } from "./getById.schema";
export const getById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = paramsSchema.parse(request.params);
    const status = await Status.findOne({
      where: { id: Number(id) },
      include: Category,
    });
    response.status(200).send(status);
  } catch (error) {
    next(error);
  }
};

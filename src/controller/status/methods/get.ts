import { Status } from "@/model/Status";
import { RequestHandler } from "@ooic/core";
import { querySchema } from "./get.schema";
export const get: RequestHandler = async (request, response, next) => {
  try {
    const { categoryId } = querySchema.parse(request.query);
    const statuses = await Status.findAll({ where: { categoryId } });
    response.status(200).send(statuses);
  } catch (error) {
    next(error);
  }
};
